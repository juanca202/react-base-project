import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'mock_session';

function isAuthenticated(request: NextRequest) {
  return Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loggedIn = isAuthenticated(request);
  const requiresAuth =
    pathname === '/' ||
    pathname.startsWith('/transfers') ||
    pathname === '/settings' ||
    pathname.startsWith('/settings/');

  if (!loggedIn && requiresAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (loggedIn && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/transfers/:path*', '/login', '/settings', '/settings/:path*']
};
