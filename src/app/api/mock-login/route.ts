import { NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'mock_session';

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get('username') ?? '').trim();
  const password = String(formData.get('password') ?? '').trim();

  if (!username || !password) {
    return NextResponse.redirect(new URL('/login', request.url), { status: 303 });
  }

  const response = NextResponse.redirect(new URL('/', request.url), { status: 303 });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: username,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8
  });

  return response;
}
