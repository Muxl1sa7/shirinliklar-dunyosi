import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_ORIGIN = process.env.FRONTEND_URL ?? 'http://localhost:5173';
const LOCALHOST_ORIGIN_REGEX = /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/;

function isAllowedOrigin(origin: string): boolean {
  if (origin === ALLOWED_ORIGIN) return true;
  // Vite tasodifiy bo'sh portni tanlashi mumkin (5173, 5174, ...) - dev rejimida ruxsat beramiz.
  if (process.env.NODE_ENV !== 'production' && LOCALHOST_ORIGIN_REGEX.test(origin)) return true;
  return false;
}

function buildCorsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (origin && isAllowedOrigin(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
  } else {
    headers['Access-Control-Allow-Origin'] = '*';
  }

  return headers;
}

export function proxy(request: NextRequest) {
  const corsHeaders = buildCorsHeaders(request.headers.get('origin'));

  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, { headers: corsHeaders });
  }

  const response = NextResponse.next();
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
