import type { Account } from '@/shared/contracts/accounts';

const MOCK_DELAY_MS = 350;

const MOCK_ACCOUNTS: Account[] = [
  {
    id: 'acc-001',
    number: '001234567890',
    balance: 1251.5,
    type: 'saving',
    name: 'Cuenta principal'
  },
  {
    id: 'acc-002',
    number: '009876543210',
    balance: 420,
    type: 'checking'
  },
  {
    id: 'acc-003',
    number: '4111111111111111',
    balance: -120.75,
    type: 'credit-card',
    name: 'Tarjeta clasica'
  }
];

/** Datos de demo: para credit-card, `balance` representa consumo acumulado. */
export async function getAccountsMock(): Promise<Account[]> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  return MOCK_ACCOUNTS;
}
