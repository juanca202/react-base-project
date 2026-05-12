import type { NextRequest } from 'next/server';
import { ACCESS_TOKEN_COOKIE } from '@/lib/auth/constants';
import { readUsernameFromDemoJwt } from '@/lib/auth/jwt-demo';

/**
 * Validación mínima de sesión en Edge (middleware): cookie presenta y JWT demo parseable con `sub`.
 */
export function hasValidSession(request: NextRequest): boolean {
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  return readUsernameFromDemoJwt(token) !== null;
}
