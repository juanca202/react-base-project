import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { hasValidSession } from '@/lib/auth/session-edge';

const LOGIN = '/login';
const SUMMARY = '/summary';

const AUTH_REQUIRED_PREFIXES = ['/summary', '/withdraw', '/services', '/pay-qr'] as const;

function requiresAuth(pathname: string): boolean {
  return AUTH_REQUIRED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

/**
 * Reglas de acceso (RN-03, RN-04, redirección de raíz).
 * Convención Next.js 16: `proxy` sustituye a `middleware` (ver docs/messages/middleware-to-proxy).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Evitar `export const config` aquí: en dev con Turbopack puede disparar un
  // módulo virtual que aún busca `src/middleware.ts` (error "file not found").
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const isLogin = pathname === LOGIN || pathname.startsWith(`${LOGIN}/`);
  const handled = pathname === '/' || isLogin || requiresAuth(pathname);

  if (!handled) {
    return NextResponse.next();
  }

  const loggedIn = hasValidSession(request);

  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = loggedIn ? SUMMARY : LOGIN;
    return NextResponse.redirect(url);
  }

  if (isLogin) {
    if (loggedIn) {
      const url = request.nextUrl.clone();
      url.pathname = SUMMARY;
      url.search = '';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (!loggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN;
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
