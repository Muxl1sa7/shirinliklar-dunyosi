import { NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/customerAuth';
import { getUserById } from '@/lib/users';

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ authenticated: false });
  }

  const user = await getUserById(userId);
  if (!user) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({
    authenticated: true,
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
  });
}
