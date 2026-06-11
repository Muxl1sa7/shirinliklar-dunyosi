import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const CUSTOMER_SESSION_SECRET = process.env.CUSTOMER_SESSION_SECRET ?? 'dev-customer-secret-change-me';

export const CUSTOMER_SESSION_COOKIE_NAME = 'customer_session';
export const CUSTOMER_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function sign(payload: string): string {
  return createHmac('sha256', CUSTOMER_SESSION_SECRET).update(payload).digest('hex');
}

export function createSessionToken(userId: string): string {
  const expires = Date.now() + CUSTOMER_SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `${userId}.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [userId, expiresAt, signature] = parts;
  const expectedSignature = sign(`${userId}.${expiresAt}`);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (signatureBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) return null;
  const expires = Number(expiresAt);
  if (Number.isNaN(expires) || Date.now() > expires) return null;
  return userId;
}

export async function getCurrentUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(CUSTOMER_SESSION_COOKIE_NAME)?.value);
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derived = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, key] = stored.split(':');
  if (!salt || !key) return false;
  const derivedBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, 'hex');
  if (derivedBuffer.length !== keyBuffer.length) return false;
  return timingSafeEqual(derivedBuffer, keyBuffer);
}
