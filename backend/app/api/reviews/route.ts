import { NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/customerAuth';
import { getUserById } from '@/lib/users';
import { getPurchaseById } from '@/lib/purchases';
import { createReview, hasUserReviewed } from '@/lib/reviews';

interface ReviewBody {
  orderId: string;
  productId: string;
  rating: number;
  text: string;
}

export async function POST(request: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as Partial<ReviewBody>;
  const { orderId, productId, rating, text } = body;

  if (typeof rating !== 'number' || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ success: false, message: "Baho 1 dan 5 gacha bo'lishi kerak" }, { status: 400 });
  }

  if (!text || !text.trim()) {
    return NextResponse.json({ success: false, message: 'Sharh matnini kiriting' }, { status: 400 });
  }

  if (!orderId || !productId) {
    return NextResponse.json({ success: false, message: "Buyurtma ma'lumotlari noto'g'ri" }, { status: 400 });
  }

  const order = await getPurchaseById(orderId);
  if (!order || order.userId !== userId) {
    return NextResponse.json({ success: false, message: 'Bu buyurtma sizga tegishli emas' }, { status: 403 });
  }

  if (order.status !== 'received') {
    return NextResponse.json(
      { success: false, message: "Sharh qoldirish uchun buyurtmani 'Qabul qilindi' deb belgilang" },
      { status: 400 },
    );
  }

  if (!order.items.some((item) => item.productId === productId)) {
    return NextResponse.json(
      { success: false, message: 'Bu mahsulot ushbu buyurtmada mavjud emas' },
      { status: 400 },
    );
  }

  if (await hasUserReviewed(userId, productId, orderId)) {
    return NextResponse.json({ success: false, message: 'Siz bu mahsulotga sharh qoldirgansiz' }, { status: 409 });
  }

  const user = await getUserById(userId);

  const review = await createReview({
    productId,
    userId,
    userName: user?.name ?? 'Foydalanuvchi',
    orderId,
    rating,
    text: text.trim(),
  });

  return NextResponse.json({ success: true, review });
}
