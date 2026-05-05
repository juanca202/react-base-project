export type TransferDraft = {
  transferType: string;
  originAccountId: string;
  destinationAccountId: string;
  amount: number;
  description: string;
};

export type TransferReceipt = TransferDraft & {
  operationId: string;
  executedAt: string;
};
