import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { createProduct, getAllProducts } from '@/lib/products';
import type { Product } from '@/data/products';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ products: await getAllProducts() });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as Partial<Product>;
  const { name, price, image, type, category, description } = body;

  if (!name || !price || !image || !type || !category || !description) {
    return NextResponse.json({ message: "Majburiy maydonlarni to'ldiring" }, { status: 400 });
  }

  const product = await createProduct({
    name,
    price,
    image,
    type,
    category,
    description,
    sizes: body.sizes ?? [],
    flavors: body.flavors ?? [],
    dietFriendly: body.dietFriendly ?? false,
    healthNote: body.healthNote ?? '',
    ingredients: body.ingredients ?? [],
    storage: body.storage ?? '',
  });

  return NextResponse.json({ product }, { status: 201 });
}
