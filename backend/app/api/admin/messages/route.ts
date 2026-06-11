import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { readRecords } from '@/lib/storage';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const messages = await readRecords('messages.json');
  return NextResponse.json({ messages });
}
