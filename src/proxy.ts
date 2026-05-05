import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEMO_ACCESS_TOKEN_COOKIE, parseUsernameFromDemoJwt } from '@/lib/demo-auth';

function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get(DEMO_ACCESS_TOKEN_COOKIE)?.value;
  return Boolean(parseUsernameFromDemoJwt(token));
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

export const proxyConfig = {
  matcher: ['/', '/transfers/:path*', '/login', '/settings', '/settings/:path*']
};
