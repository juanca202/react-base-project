import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AUTH_COOKIE, getUsernameFromSessionToken, hasValidSessionToken } from '@/lib/auth';
import { mockSettingsUserFromLoginUsername } from '@/lib/mock-settings-user';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (!hasValidSessionToken(token) || !token) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const username = getUsernameFromSessionToken(token);
  const user = mockSettingsUserFromLoginUsername(username ?? 'usuario');

  return NextResponse.json({ user });
}
