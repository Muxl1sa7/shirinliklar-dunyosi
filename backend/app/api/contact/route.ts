import { NextResponse } from 'next/server';
import { appendRecord } from '@/lib/storage';

interface ContactBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactBody>;
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ success: false, message: 'Barcha maydonlarni to\'ldiring' }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ success: false, message: "Email manzili noto'g'ri" }, { status: 400 });
  }

  await appendRecord('messages.json', {
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true, message: 'Xabaringiz yuborildi' });
}
