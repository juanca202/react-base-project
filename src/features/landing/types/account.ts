/**
 * Contrato alineado con GET /api/accounts — docs/product/technical-docs/api-accounts.md
 */
export type AccountType = 'saving' | 'checking' | 'credit-card';

export type Account = {
  id: string;
  number: string;
  balance: number;
  type: AccountType;
  name?: string;
};
