import { NextResponse } from 'next/server';
import {
  buildDemoJwt,
  buildDemoRefreshToken,
  DEMO_ACCESS_TOKEN_COOKIE,
  DEMO_REFRESH_TOKEN_COOKIE,
  demoAuthCookieOptions
} from '@/lib/demo-auth';

/** POST /api/token — ver `docs/product/technical-docs/api-token-login.md`. Mock RN-06, no producción. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo JSON inválido.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Se esperaba un objeto JSON.' }, { status: 400 });
  }

  const rec = body as Record<string, unknown>;
  const username = typeof rec.username === 'string' ? rec.username.trim() : '';
  const password = typeof rec.password === 'string' ? rec.password.trim() : '';

  if (!username || !password) {
    return NextResponse.json({ error: 'Usuario y contraseña obligatorios.' }, { status: 401 });
  }

  const token = buildDemoJwt(username);
  const refresh_token = buildDemoRefreshToken(username);
  const cookieOpts = demoAuthCookieOptions();

  const res = NextResponse.json({ token, refresh_token });
  res.cookies.set(DEMO_ACCESS_TOKEN_COOKIE, token, cookieOpts);
  res.cookies.set(DEMO_REFRESH_TOKEN_COOKIE, refresh_token, cookieOpts);
  return res;
}
