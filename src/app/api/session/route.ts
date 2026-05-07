import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AUTH_COOKIE, getUsernameFromSessionToken, hasValidSessionToken } from '@/lib/auth';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (!hasValidSessionToken(token) || !token) {
    return NextResponse.json({ username: null }, { status: 401 });
  }

  const username = getUsernameFromSessionToken(token);

  return NextResponse.json({ username: username ?? 'usuario' });
}
