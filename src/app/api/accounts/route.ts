import { NextResponse } from 'next/server';
import { getAccountsMock } from '@/features/landing/api/accounts-mock';

/** GET /api/accounts — contrato definido en docs/product/technical-docs/api-accounts.md */
export async function GET() {
  const accounts = await getAccountsMock();
  return NextResponse.json(accounts);
}
