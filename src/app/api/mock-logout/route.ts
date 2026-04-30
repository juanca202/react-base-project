import { NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'mock_session';

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/login', request.url), { status: 303 });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
