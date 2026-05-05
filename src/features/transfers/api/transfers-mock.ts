import type { TransferDraft, TransferReceipt } from '@/shared/contracts/transfers';

const MOCK_DELAY_MS = 400;

function createOperationId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `TRX-${timestamp}-${random}`;
}

export async function executeTransferMock(draft: TransferDraft): Promise<TransferReceipt> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  return {
    ...draft,
    operationId: createOperationId(),
    executedAt: new Date().toISOString()
  };
}
