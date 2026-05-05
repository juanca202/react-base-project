import { NextResponse } from 'next/server';
import {
  DEMO_ACCESS_TOKEN_COOKIE,
  DEMO_REFRESH_TOKEN_COOKIE,
  LEGACY_MOCK_SESSION_COOKIE
} from '@/lib/demo-auth';

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/login', request.url), { status: 303 });
  response.cookies.delete(DEMO_ACCESS_TOKEN_COOKIE);
  response.cookies.delete(DEMO_REFRESH_TOKEN_COOKIE);
  response.cookies.delete(LEGACY_MOCK_SESSION_COOKIE);
  return response;
}
