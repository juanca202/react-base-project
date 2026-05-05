import type { Movement } from '@/shared/contracts/activity';

const MOCK_DELAY_MS = 350;

const MOCK_MOVEMENTS: Movement[] = [
  {
    accountNumber: '001234567890',
    date: '2026-05-05T09:30:00Z',
    description: 'Transferencia recibida',
    amount: 250
  },
  {
    accountNumber: '001234567890',
    date: '2026-05-04T21:10:00Z',
    description: 'Pago de servicio',
    amount: -42.75
  },
  {
    accountNumber: '009876543210',
    date: '2026-05-04T08:05:00Z',
    description: 'Compra comercio',
    amount: -15.9
  }
];

export async function getRecentActivityMock(): Promise<Movement[]> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  return MOCK_MOVEMENTS;
}
