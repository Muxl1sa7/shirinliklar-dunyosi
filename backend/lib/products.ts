import { promises as fs } from 'fs';
import path from 'path';
import type { Product } from '@/data/products';

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json');

async function readProducts(): Promise<Product[]> {
  const content = await fs.readFile(PRODUCTS_FILE, 'utf-8');
  return JSON.parse(content) as Product[];
}

async function writeProducts(products: Product[]): Promise<void> {
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

function slugify(name: string, existing: Product[]): string {
  const base =
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'product';

  let id = base;
  let counter = 2;
  while (existing.some((product) => product.id === id)) {
    id = `${base}-${counter}`;
    counter += 1;
  }

  return id;
}

export async function getAllProducts(): Promise<Product[]> {
  return readProducts();
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await readProducts();
  return products.find((product) => product.id === id);
}

export async function createProduct(data: Omit<Product, 'id'>): Promise<Product> {
  const products = await readProducts();
  const product: Product = { ...data, id: slugify(data.name, products) };
  products.push(product);
  await writeProducts(products);
  return product;
}

export async function updateProduct(id: string, data: Omit<Product, 'id'>): Promise<Product | undefined> {
  const products = await readProducts();
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) return undefined;

  products[index] = { ...data, id };
  await writeProducts(products);
  return products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await readProducts();
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) return false;

  products.splice(index, 1);
  await writeProducts(products);
  return true;
}
