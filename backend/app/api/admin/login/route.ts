import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  verifyCredentials,
} from '@/lib/auth';

interface LoginBody {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<LoginBody>;
  const { username, password } = body;

  if (!username || !password || !verifyCredentials(username, password)) {
    return NextResponse.json({ success: false, message: "Login yoki parol noto'g'ri" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: '/',
  });

  return NextResponse.json({ success: true });
}
