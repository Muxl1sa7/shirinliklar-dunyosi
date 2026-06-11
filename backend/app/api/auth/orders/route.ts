import { NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/customerAuth';
import { readRecords } from '@/lib/storage';

interface OrderRecord {
  fullName: string;
  phone: string;
  eventDate: string;
  size: string;
  flavor: string;
  note: string;
  createdAt: string;
  userId?: string;
}

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const orders = await readRecords<OrderRecord>('orders.json');
  return NextResponse.json({ orders: orders.filter((order) => order.userId === userId) });
}
