import { NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/customerAuth';
import { getProductById } from '@/lib/products';
import { getPriceForSize } from '@/lib/pricing';
import { createPurchaseOrder, type PurchaseOrderItem } from '@/lib/purchases';

interface CheckoutItemBody {
  productId: string;
  size?: string;
  flavor?: string;
  quantity: number;
}

interface CheckoutCardBody {
  number: string;
  expiry: string;
  cvv: string;
  holder: string;
}

interface CheckoutBody {
  items: CheckoutItemBody[];
  card: CheckoutCardBody;
}

const EXPIRY_REGEX = /^(0[1-9]|1[0-2])\/(\d{2})$/;
const CVV_REGEX = /^\d{3,4}$/;

export async function POST(request: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as Partial<CheckoutBody>;
  const { items, card } = body;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ success: false, message: "Savatcha bo'sh" }, { status: 400 });
  }

  if (!card) {
    return NextResponse.json({ success: false, message: "Karta ma'lumotlarini kiriting" }, { status: 400 });
  }

  const cardNumber = card.number?.replace(/\s/g, '') ?? '';
  if (!/^\d{13,19}$/.test(cardNumber)) {
    return NextResponse.json({ success: false, message: "Karta raqami noto'g'ri" }, { status: 400 });
  }

  const expiryMatch = card.expiry?.match(EXPIRY_REGEX);
  if (!expiryMatch) {
    return NextResponse.json({ success: false, message: "Karta amal qilish muddati noto'g'ri" }, { status: 400 });
  }

  const expMonth = Number(expiryMatch[1]);
  const expYear = 2000 + Number(expiryMatch[2]);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    return NextResponse.json({ success: false, message: "Karta amal qilish muddati noto'g'ri" }, { status: 400 });
  }

  if (!card.cvv || !CVV_REGEX.test(card.cvv)) {
    return NextResponse.json({ success: false, message: "CVV kodi noto'g'ri" }, { status: 400 });
  }

  if (!card.holder || !card.holder.trim()) {
    return NextResponse.json({ success: false, message: "Karta egasining ismini kiriting" }, { status: 400 });
  }

  const orderItems: PurchaseOrderItem[] = [];

  for (const item of items) {
    if (!item.productId || !Number.isInteger(item.quantity) || item.quantity <= 0) {
      return NextResponse.json({ success: false, message: "Savatcha ma'lumotlari noto'g'ri" }, { status: 400 });
    }

    const product = await getProductById(item.productId);
    if (!product) {
      return NextResponse.json({ success: false, message: 'Mahsulot topilmadi' }, { status: 400 });
    }

    const unitPrice = getPriceForSize(product.price, item.size);
    orderItems.push({
      productId: product.id,
      name: product.name,
      image: product.image,
      size: item.size,
      flavor: item.flavor,
      quantity: item.quantity,
      unitPrice,
      lineTotal: unitPrice * item.quantity,
    });
  }

  const total = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const cardLast4 = cardNumber.slice(-4);

  const order = await createPurchaseOrder({
    userId,
    items: orderItems,
    total,
    cardLast4,
  });

  return NextResponse.json({ success: true, message: "To'lov muvaffaqiyatli amalga oshirildi", order });
}
