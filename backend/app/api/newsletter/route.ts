import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { appendRecord } from '@/lib/storage';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FILE_PATH = path.join(process.cwd(), 'data', 'storage', 'subscribers.json');

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string };
  const email = body.email;

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ success: false, message: "Email manzili noto'g'ri" }, { status: 400 });
  }

  try {
    const content = await fs.readFile(FILE_PATH, 'utf-8');
    const subscribers: { email: string }[] = JSON.parse(content);
    if (subscribers.some((s) => s.email === email)) {
      return NextResponse.json({ success: true, message: 'Siz allaqachon obuna bo\'lgansiz' });
    }
  } catch {
    // file doesn't exist yet, will be created by appendRecord
  }

  await appendRecord('subscribers.json', { email, createdAt: new Date().toISOString() });

  return NextResponse.json({ success: true, message: "Obuna bo'lganingiz uchun rahmat" });
}
