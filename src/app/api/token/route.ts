import { NextResponse } from 'next/server';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '@/lib/auth/constants';
import { sessionCookieOptions } from '@/lib/auth/cookie-options';
import { createDemoJwt, createDemoRefreshToken } from '@/lib/auth/jwt-demo';

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  refresh_token: string;
};

/**
 * POST /api/token — contrato en docs/product/technical-docs/api-token-login.md.
 * Validación mock (RN-06): credenciales no vacías → éxito; vacías o ausentes → 401.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'invalid_json', message: 'Cuerpo JSON inválido' },
      { status: 400 }
    );
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json(
      { error: 'invalid_body', message: 'Se esperaba un objeto JSON' },
      { status: 400 }
    );
  }

  const { username, password } = body as Partial<LoginRequest>;
  const user = typeof username === 'string' ? username.trim() : '';
  const pass = typeof password === 'string' ? password.trim() : '';

  if (!user || !pass) {
    return NextResponse.json(
      {
        error: 'invalid_credentials',
        message: 'Usuario y contraseña son obligatorios'
      },
      { status: 401 }
    );
  }

  const token = createDemoJwt(user);
  const refresh_token = createDemoRefreshToken(user);
  const json: LoginResponse = { token, refresh_token };

  const res = NextResponse.json(json, { status: 200 });
  const opts = sessionCookieOptions();
  res.cookies.set(ACCESS_TOKEN_COOKIE, token, opts);
  res.cookies.set(REFRESH_TOKEN_COOKIE, refresh_token, opts);

  return res;
}
