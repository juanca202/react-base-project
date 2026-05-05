import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { buildMockSettings } from '@/features/settings/api/settings-mock';
import { DEMO_ACCESS_TOKEN_COOKIE, parseUsernameFromDemoJwt } from '@/lib/demo-auth';

/** GET /api/settings — contrato en docs/product/technical-docs/api-settings.md */
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(DEMO_ACCESS_TOKEN_COOKIE)?.value;
  const username = parseUsernameFromDemoJwt(token);

  if (!username) {
    return NextResponse.json({ error: 'Sesión inválida o ausente.' }, { status: 401 });
  }

  return NextResponse.json(buildMockSettings(username), { status: 200 });
}
