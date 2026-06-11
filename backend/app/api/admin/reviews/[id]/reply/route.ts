import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { addAdminReply } from '@/lib/reviews';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as { reply?: string };

  if (!body.reply || !body.reply.trim()) {
    return NextResponse.json({ success: false, message: 'Javob matnini kiriting' }, { status: 400 });
  }

  const review = await addAdminReply(id, body.reply.trim());
  if (!review) {
    return NextResponse.json({ success: false, message: 'Sharh topilmadi' }, { status: 404 });
  }

  return NextResponse.json({ success: true, review });
}
