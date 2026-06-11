import { NextResponse } from 'next/server';
import { getReviewsByProduct } from '@/lib/reviews';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const reviews = await getReviewsByProduct(id);
  return NextResponse.json({ reviews });
}
