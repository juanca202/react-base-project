export type TransferFlowStep = 'selector' | 'formulario' | 'verificacion' | 'exito';

export type TransferFormDraft = {
  sourceAccountNumber: string;
  targetAccountNumber: string;
  routerNumber: string;
  amount: number;
  description: string;
};

export type TransferFlowData = {
  transferType: string | null;
  formDraft: TransferFormDraft | null;
  operationId: string | null;
};
