'use client';

import { createContext, useContext, useState } from 'react';
import type { Account } from '@/app/api/accounts/route';
import type {
  TransferFlowContext,
  TransferFlowState,
  TransferReceipt
} from '../types/transfer-flow.types';

const initialState: TransferFlowState = {
  accounts: [],
  fromAccount: null,
  toAccount: null,
  amount: null,
  concept: '',
  receipt: null
};

const TransferFlowCtx = createContext<TransferFlowContext | null>(null);

export function TransferFlowProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TransferFlowState>(initialState);

  const setAccounts = (accounts: Account[]) => setState((prev) => ({ ...prev, accounts }));

  const setFromAccount = (fromAccount: Account | null) =>
    setState((prev) => ({ ...prev, fromAccount }));

  const setToAccount = (toAccount: Account | null) => setState((prev) => ({ ...prev, toAccount }));

  const setAmount = (amount: number | null) => setState((prev) => ({ ...prev, amount }));

  const setConcept = (concept: string) => setState((prev) => ({ ...prev, concept }));

  const setReceipt = (receipt: TransferReceipt) => setState((prev) => ({ ...prev, receipt }));

  const reset = () => setState(initialState);

  return (
    <TransferFlowCtx.Provider
      value={{
        ...state,
        setAccounts,
        setFromAccount,
        setToAccount,
        setAmount,
        setConcept,
        setReceipt,
        reset
      }}
    >
      {children}
    </TransferFlowCtx.Provider>
  );
}

export function useTransferFlow(): TransferFlowContext {
  const ctx = useContext(TransferFlowCtx);
  if (!ctx) {
    throw new Error('useTransferFlow must be used inside <TransferFlowProvider>');
  }
  return ctx;
}
