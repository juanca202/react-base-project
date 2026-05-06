import { NextResponse } from 'next/server';
import { AUTH_COOKIE, REFRESH_COOKIE, createMockRefreshToken, createMockToken } from '@/lib/auth';

type LoginRequest = {
  username?: string;
  password?: string;
};

type LoginResponse = {
  token: string;
  refresh_token: string;
};

function unauthorizedResponse() {
  return NextResponse.json({ error: 'Credenciales invalidas para la demo.' }, { status: 401 });
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    return unauthorizedResponse();
  }

  let body: LoginRequest;
  try {
    body = (await request.json()) as LoginRequest;
  } catch {
    return unauthorizedResponse();
  }

  const username = body.username?.trim() ?? '';
  const password = body.password?.trim() ?? '';

  if (!username || !password) {
    return unauthorizedResponse();
  }

  const responseBody: LoginResponse = {
    token: createMockToken(username),
    refresh_token: createMockRefreshToken(username)
  };

  const response = NextResponse.json(responseBody, { status: 200 });

  // Demo scope only: this does not represent production-grade auth security.
  response.cookies.set(AUTH_COOKIE, responseBody.token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60
  });
  response.cookies.set(REFRESH_COOKIE, responseBody.refresh_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 7 * 24 * 60 * 60
  });

  return response;
}
