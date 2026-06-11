import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  CUSTOMER_SESSION_COOKIE_NAME,
  CUSTOMER_SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  verifyPassword,
} from '@/lib/customerAuth';
import { getUserByEmail } from '@/lib/users';

interface LoginBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<LoginBody>;
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ success: false, message: "Email va parolni kiriting" }, { status: 400 });
  }

  const user = await getUserByEmail(email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ success: false, message: "Email yoki parol noto'g'ri" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(CUSTOMER_SESSION_COOKIE_NAME, createSessionToken(user.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: CUSTOMER_SESSION_MAX_AGE_SECONDS,
    path: '/',
  });

  return NextResponse.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
  });
}
