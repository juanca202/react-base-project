import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_COOKIE } from '@/lib/auth/constants';
import { readUsernameFromDemoJwt } from '@/lib/auth/jwt-demo';

/** Valores permitidos de `Account.type` — ver docs/product/technical-docs/api-accounts.md */
export type AccountType = 'saving' | 'checking' | 'credit-card';

/**
 * DTO de cuenta para resumen — contrato en docs/product/technical-docs/api-accounts.md
 */
export type Account = {
  id: string;
  number: string;
  balance: number;
  type: AccountType;
  name?: string;
};

function getAuthToken(request: Request): string | undefined {
  const auth = request.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) {
    return auth.slice('Bearer '.length).trim();
  }
  return undefined;
}

/**
 * Listado mock alineado al contrato; suficiente para landing y `accountsCarousel` (props).
 * Exportado para reutilizar en Server Components sin round-trip HTTP.
 */
export function getDemoAccountsForUser(username: string): Account[] {
  const suffix = username.trim() || 'demo';
  return [
    {
      id: `acc-${suffix}-001`,
      number: '001234567890',
      balance: 1250.5,
      type: 'saving',
      name: 'Cuenta principal'
    },
    {
      id: `acc-${suffix}-002`,
      number: '009876543210',
      balance: 420.0,
      type: 'checking',
      name: 'Cuenta corriente'
    },
    {
      id: `acc-${suffix}-003`,
      number: '4111111111111111',
      balance: -120.75,
      type: 'credit-card',
      name: 'Tarjeta clasica'
    }
  ];
}

/**
 * GET /api/accounts — contrato en docs/product/technical-docs/api-accounts.md
 */
export async function GET(request: Request) {
  let token = getAuthToken(request);
  if (!token) {
    const jar = await cookies();
    token = jar.get(ACCESS_TOKEN_COOKIE)?.value;
  }

  const username = readUsernameFromDemoJwt(token);
  if (!username) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const accounts: Account[] = getDemoAccountsForUser(username);
  return NextResponse.json(accounts, { status: 200 });
}
