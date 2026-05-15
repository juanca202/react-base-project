import type { Account } from '@/app/api/accounts/route';

export type TransferReceipt = {
  receiptId: string;
  timestamp: string;
};

export type TransferFlowState = {
  accounts: Account[];
  fromAccount: Account | null;
  toAccount: Account | null;
  amount: number | null;
  concept: string;
  receipt: TransferReceipt | null;
};

export type TransferFlowActions = {
  setAccounts: (accounts: Account[]) => void;
  setFromAccount: (account: Account | null) => void;
  setToAccount: (account: Account | null) => void;
  setAmount: (amount: number | null) => void;
  setConcept: (concept: string) => void;
  setReceipt: (receipt: TransferReceipt) => void;
  reset: () => void;
};

export type TransferFlowContext = TransferFlowState & TransferFlowActions;
