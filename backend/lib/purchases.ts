import { randomUUID } from 'crypto';
import { appendRecord, readRecords, writeRecords } from './storage';

export interface PurchaseOrderItem {
  productId: string;
  name: string;
  image: string;
  size?: string;
  flavor?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface PurchaseOrder {
  id: string;
  userId: string;
  items: PurchaseOrderItem[];
  total: number;
  status: 'paid' | 'received';
  cardLast4: string;
  address: string;
  createdAt: string;
  receivedAt?: string;
}

const FILE = 'purchases.json';

export async function createPurchaseOrder(
  data: Omit<PurchaseOrder, 'id' | 'status' | 'createdAt'>,
): Promise<PurchaseOrder> {
  const order: PurchaseOrder = {
    id: randomUUID(),
    status: 'paid',
    createdAt: new Date().toISOString(),
    ...data,
  };

  await appendRecord(FILE, order);
  return order;
}

export async function getPurchasesByUser(userId: string): Promise<PurchaseOrder[]> {
  const all = await readRecords<PurchaseOrder>(FILE);
  return all.filter((order) => order.userId === userId);
}

export async function getAllPurchases(): Promise<PurchaseOrder[]> {
  const all = await readRecords<PurchaseOrder>(FILE);
  return [...all].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getPurchaseById(id: string): Promise<PurchaseOrder | undefined> {
  const all = await readRecords<PurchaseOrder>(FILE);
  return all.find((order) => order.id === id);
}

export async function markPurchaseReceived(id: string, userId: string): Promise<PurchaseOrder | null> {
  const all = await readRecords<PurchaseOrder>(FILE);
  const index = all.findIndex((order) => order.id === id && order.userId === userId);
  if (index === -1) return null;

  if (all[index].status !== 'received') {
    all[index] = { ...all[index], status: 'received', receivedAt: new Date().toISOString() };
    await writeRecords(FILE, all);
  }

  return all[index];
}
