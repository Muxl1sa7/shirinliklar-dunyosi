import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  CUSTOMER_SESSION_COOKIE_NAME,
  CUSTOMER_SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  hashPassword,
} from '@/lib/customerAuth';
import { createUser, getUserByEmail } from '@/lib/users';

interface RegisterBody {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<RegisterBody>;
  const { name, email, phone, password } = body;

  if (!name || !email || !phone || !password) {
    return NextResponse.json({ success: false, message: "Barcha maydonlarni to'ldiring" }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ success: false, message: "Email manzili noto'g'ri" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json(
      { success: false, message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" },
      { status: 400 },
    );
  }

  const existing = await getUserByEmail(email);
  if (existing) {
    return NextResponse.json(
      { success: false, message: 'Bu email bilan foydalanuvchi allaqachon ro\'yxatdan o\'tgan' },
      { status: 409 },
    );
  }

  const user = await createUser({ name, email, phone, passwordHash: hashPassword(password) });

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
