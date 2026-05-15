import type { AccountType } from '@/app/api/accounts/route';

/**
 * Devuelve los últimos 4 dígitos con máscara según RN-13.
 * Ej: '001234567890' → '**** *7890'
 */
export function maskAccountNumber(number: string): string {
  const last4 = number.slice(-4);
  return `**** *${last4}`;
}

/** Devuelve el prefijo de texto legible para el tipo de cuenta. */
export function accountTypeLabel(type: AccountType): string {
  switch (type) {
    case 'saving':
      return 'Cta. Ahorros';
    case 'checking':
      return 'Cta. Corriente';
    case 'credit-card':
      return 'Tarjeta';
  }
}
