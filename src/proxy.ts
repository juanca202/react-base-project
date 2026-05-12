import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { hasValidSession } from '@/lib/auth/session-edge';

const LOGIN = '/login';
const SUMMARY = '/summary';

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

  const handled =
    pathname === '/' ||
    pathname === '/login' ||
    pathname.startsWith('/login/') ||
    pathname === '/summary' ||
    pathname.startsWith('/summary/');

  if (!handled) {
    return NextResponse.next();
  }

  const loggedIn = hasValidSession(request);

  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = loggedIn ? SUMMARY : LOGIN;
    return NextResponse.redirect(url);
  }

  if (pathname === LOGIN || pathname.startsWith(`${LOGIN}/`)) {
    if (loggedIn) {
      const url = request.nextUrl.clone();
      url.pathname = SUMMARY;
      url.search = '';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname === SUMMARY || pathname.startsWith(`${SUMMARY}/`)) {
    if (!loggedIn) {
      const url = request.nextUrl.clone();
      url.pathname = LOGIN;
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
