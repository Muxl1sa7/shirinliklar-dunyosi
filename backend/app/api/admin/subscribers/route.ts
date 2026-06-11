import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { readRecords } from '@/lib/storage';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const subscribers = await readRecords('subscribers.json');
  return NextResponse.json({ subscribers });
}
