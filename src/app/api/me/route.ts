import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_COOKIE } from '@/lib/auth/constants';
import { readUsernameFromDemoJwt } from '@/lib/auth/jwt-demo';

/**
 * Ejemplo de recurso interno “autenticado”: acepta Bearer o cookie de sesión demo.
 */
export async function GET(request: Request) {
  const auth = request.headers.get('authorization');
  let token: string | undefined;

  if (auth?.startsWith('Bearer ')) {
    token = auth.slice('Bearer '.length).trim();
  } else {
    const jar = await cookies();
    token = jar.get(ACCESS_TOKEN_COOKIE)?.value;
  }

  const username = readUsernameFromDemoJwt(token);
  if (!username) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ username });
}
