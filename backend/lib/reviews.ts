import { randomUUID } from 'crypto';
import { appendRecord, readRecords, writeRecords } from './storage';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  orderId: string;
  rating: number;
  text: string;
  createdAt: string;
  adminReply?: string;
  adminReplyAt?: string;
}

const FILE = 'reviews.json';

export async function getReviewsByProduct(productId: string): Promise<Review[]> {
  const all = await readRecords<Review>(FILE);
  return all.filter((review) => review.productId === productId);
}

export async function getAllReviews(): Promise<Review[]> {
  return readRecords<Review>(FILE);
}

export async function hasUserReviewed(userId: string, productId: string, orderId: string): Promise<boolean> {
  const all = await readRecords<Review>(FILE);
  return all.some((review) => review.userId === userId && review.productId === productId && review.orderId === orderId);
}

export async function createReview(data: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
  const review: Review = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };

  await appendRecord(FILE, review);
  return review;
}

export async function addAdminReply(id: string, reply: string): Promise<Review | null> {
  const all = await readRecords<Review>(FILE);
  const index = all.findIndex((review) => review.id === id);
  if (index === -1) return null;

  all[index] = { ...all[index], adminReply: reply, adminReplyAt: new Date().toISOString() };
  await writeRecords(FILE, all);
  return all[index];
}
