import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { readRecords } from '@/lib/storage';
import type { User } from '@/lib/users';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const users = await readRecords<User>('users.json');
  const safeUsers = users.map(({ id, name, email, phone, createdAt }) => ({
    id,
    name,
    email,
    phone,
    createdAt,
  }));

  return NextResponse.json({ users: safeUsers });
}
