import { NextResponse, type NextRequest } from 'next/server';
import { AUTH_COOKIE, hasValidSessionToken } from '@/lib/auth';

const LOGIN_PATH = '/iniciar-sesion';
const AUTHENTICATED_HOME_PATH = '/resumen';
const PROTECTED_PATHS = [
  AUTHENTICATED_HOME_PATH,
  '/settings',
  '/privacy',
  '/terms',
  '/transferencias',
  '/servicios',
  '/pagos-qr',
  '/proximos-pagos',
  '/retirar'
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const isAuthenticated = hasValidSessionToken(token);

  const isProtectedRoute = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  if (isAuthenticated && pathname === LOGIN_PATH) {
    return NextResponse.redirect(new URL(AUTHENTICATED_HOME_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
