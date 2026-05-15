'use client';

import { TransferFlowProvider } from '@/features/transfers/context/transfer-flow-context';

export default function TransferLayout({ children }: { children: React.ReactNode }) {
  return <TransferFlowProvider>{children}</TransferFlowProvider>;
}
