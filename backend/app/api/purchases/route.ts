import { NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/customerAuth';
import { getPurchasesByUser } from '@/lib/purchases';

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const purchases = await getPurchasesByUser(userId);
  return NextResponse.json({ purchases });
}
