import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get('type');
  const category = searchParams.get('category');

  let result = products;

  if (type) {
    result = result.filter((product) => product.type === type);
  }

  if (category) {
    result = result.filter((product) => product.category === category);
  }

  return NextResponse.json({ products: result });
}
