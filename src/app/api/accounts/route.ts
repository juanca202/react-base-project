import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { DEMO_ACCOUNTS } from '@/features/landing/mock/demo-resumen-data';
import { AUTH_COOKIE, hasValidSessionToken } from '@/lib/auth';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (!hasValidSessionToken(token)) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  return NextResponse.json(DEMO_ACCOUNTS);
}
