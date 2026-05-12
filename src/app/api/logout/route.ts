import { NextResponse } from 'next/server';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '@/lib/auth/constants';

/**
 * Cierra sesión de la demo: elimina cookies emitidas por POST /api/token (RN-05).
 */
export async function POST() {
  const res = NextResponse.json({ ok: true }, { status: 200 });
  const clear = {
    httpOnly: true,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 0,
    secure: process.env.NODE_ENV === 'production'
  };
  res.cookies.set(ACCESS_TOKEN_COOKIE, '', clear);
  res.cookies.set(REFRESH_TOKEN_COOKIE, '', clear);
  return res;
}
