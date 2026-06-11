import { NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/customerAuth';
import { markPurchaseReceived } from '@/lib/purchases';

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const order = await markPurchaseReceived(id, userId);

  if (!order) {
    return NextResponse.json({ success: false, message: 'Buyurtma topilmadi' }, { status: 404 });
  }

  return NextResponse.json({ success: true, order });
}
