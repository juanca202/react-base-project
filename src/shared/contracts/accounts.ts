export const ACCOUNT_TYPES = ['saving', 'checking', 'credit-card'] as const;

export type AccountType = (typeof ACCOUNT_TYPES)[number];

export type Account = {
  id: string;
  number: string;
  balance: number;
  type: AccountType;
  name?: string;
};
