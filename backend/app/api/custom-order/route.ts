import { NextResponse } from 'next/server';
import { appendRecord } from '@/lib/storage';
import { getCurrentUserId } from '@/lib/customerAuth';

interface CustomOrderBody {
  fullName: string;
  phone: string;
  eventDate: string;
  size: string;
  flavor: string;
  note?: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<CustomOrderBody>;
  const { fullName, phone, eventDate, size, flavor, note } = body;

  if (!fullName || !phone || !eventDate || !size || !flavor) {
    return NextResponse.json({ success: false, message: 'Barcha majburiy maydonlarni to\'ldiring' }, { status: 400 });
  }

  const userId = await getCurrentUserId();

  await appendRecord('orders.json', {
    fullName,
    phone,
    eventDate,
    size,
    flavor,
    note: note ?? '',
    createdAt: new Date().toISOString(),
    ...(userId ? { userId } : {}),
  });

  return NextResponse.json({ success: true, message: 'Buyurtma qabul qilindi' });
}
