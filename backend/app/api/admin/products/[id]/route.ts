import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { deleteProduct, updateProduct } from '@/lib/products';
import type { Product } from '@/data/products';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as Partial<Product>;
  const { name, price, image, type, category, description } = body;

  if (!name || !price || !image || !type || !category || !description) {
    return NextResponse.json({ message: "Majburiy maydonlarni to'ldiring" }, { status: 400 });
  }

  const product = await updateProduct(id, {
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

  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteProduct(id);

  if (!deleted) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
