export const TRANSFER_FLOW_DRAFT_KEY = 'transfers.flow.draft';

export const TRANSFER_STEPS = ['form', 'verification', 'success'] as const;

export type TransferStep = (typeof TRANSFER_STEPS)[number];

const ALLOWED_TRANSITIONS: Record<TransferStep, TransferStep[]> = {
  form: ['verification'],
  verification: ['form', 'success'],
  success: ['form']
};

export function canTransition(from: TransferStep, to: TransferStep) {
  return ALLOWED_TRANSITIONS[from].includes(to);
}
