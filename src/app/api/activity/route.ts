import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_COOKIE } from '@/lib/auth/constants';
import { readUsernameFromDemoJwt } from '@/lib/auth/jwt-demo';

/**
 * DTO de movimiento para actividad reciente — contrato en docs/product/technical-docs/api-activity.md
 */
export type Movement = {
  accountNumber: string;
  date: string;
  description: string;
  amount: number;
};

function getAuthToken(request: Request): string | undefined {
  const auth = request.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) {
    return auth.slice('Bearer '.length).trim();
  }
  return undefined;
}

/**
 * Movimientos mock: orden del mas reciente al mas antiguo; importes positivos y negativos.
 */
function demoActivity(): Movement[] {
  return [
    {
      accountNumber: '001234567890',
      date: '2026-05-12T10:15:00Z',
      description: 'Transferencia recibida',
      amount: 180.0
    },
    {
      accountNumber: '009876543210',
      date: '2026-05-11T16:40:00Z',
      description: 'Pago de servicio',
      amount: -42.75
    },
    {
      accountNumber: '4111111111111111',
      date: '2026-05-10T19:22:00Z',
      description: 'Compra comercio',
      amount: -15.9
    },
    {
      accountNumber: '001234567890',
      date: '2026-05-09T08:05:00Z',
      description: 'Deposito en efectivo',
      amount: 500.0
    }
  ];
}

/**
 * GET /api/activity — contrato en docs/product/technical-docs/api-activity.md
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

  const movements: Movement[] = demoActivity();
  return NextResponse.json(movements, { status: 200 });
}
