import type { Account } from '@/features/landing/types/account';
import type { Movement } from '@/features/landing/types/movement';

/** Datos mock alineados a technical-docs (demo). */
export const DEMO_ACCOUNTS: Account[] = [
  {
    id: 'acc-001',
    number: '001234567890',
    balance: 314.78,
    type: 'saving',
    name: 'Gastos'
  },
  {
    id: 'acc-002',
    number: '009876543210',
    balance: 420.0,
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

/** Textos y fechas alineados a maqueta Home Figma (36:1699). */
export const DEMO_MOVEMENTS: Movement[] = [
  {
    accountNumber: '001234567890',
    date: '2026-04-20T12:00:00Z',
    description: 'Transferencia interbancaria',
    amount: -91.02
  },
  {
    accountNumber: '001234567890',
    date: '2026-04-12T14:00:00Z',
    description: 'Retiro de cajero',
    amount: -20.0
  },
  {
    accountNumber: '009876543210',
    date: '2026-04-01T10:00:00Z',
    description: 'Nota de débito de préstamo',
    amount: -10.02
  }
];
