import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { getAllPurchases } from '@/lib/purchases';
import { getUserById } from '@/lib/users';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const purchases = await getAllPurchases();
  const enriched = await Promise.all(
    purchases.map(async (purchase) => {
      const user = await getUserById(purchase.userId);
      return {
        ...purchase,
        userName: user?.name ?? "Noma'lum",
        userEmail: user?.email ?? '',
        userPhone: user?.phone ?? '',
      };
    }),
  );

  return NextResponse.json({ purchases: enriched });
}
