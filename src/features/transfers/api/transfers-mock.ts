import { requestOtpCodeMock, verifyOtpMock } from '../../otp-verification/api/verify-otp-mock';

const MOCK_DELAY_MS = 900;

export type AccountOption = {
  id: string;
  label: string;
  maskedNumber: string;
  balance: number;
};

export const mockAccounts: AccountOption[] = [
  {
    id: 'checking-main',
    label: 'Cuenta Nómina',
    maskedNumber: '**** 1284',
    balance: 18450.32
  },
  {
    id: 'savings-main',
    label: 'Cuenta Ahorro',
    maskedNumber: '**** 9021',
    balance: 72010
  },
  {
    id: 'daily-use',
    label: 'Cuenta Gastos',
    maskedNumber: '**** 6603',
    balance: 6420.75
  }
];

export type PrepareTransferInput = {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description?: string;
};

export type PreparedTransfer = {
  transferId: string;
  fromAccount: AccountOption;
  toAccount: AccountOption;
  amount: number;
  description?: string;
};

export async function prepareTransferMock(
  input: PrepareTransferInput
): Promise<{ ok: true; transfer: PreparedTransfer } | { ok: false; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  if (input.fromAccountId === input.toAccountId) {
    return { ok: false, message: 'La cuenta de origen y destino deben ser distintas.' };
  }

  const fromAccount = mockAccounts.find((account) => account.id === input.fromAccountId);
  const toAccount = mockAccounts.find((account) => account.id === input.toAccountId);

  if (!fromAccount || !toAccount) {
    return { ok: false, message: 'No fue posible encontrar las cuentas seleccionadas.' };
  }

  if (input.amount <= 0) {
    return { ok: false, message: 'El monto debe ser mayor a cero.' };
  }

  if (input.amount > fromAccount.balance) {
    return { ok: false, message: 'Saldo insuficiente en la cuenta de origen.' };
  }

  return {
    ok: true,
    transfer: {
      transferId: `TRX-${Date.now()}`,
      fromAccount,
      toAccount,
      amount: input.amount,
      description: input.description?.trim() || undefined
    }
  };
}

export async function requestTransferOtpMock(): Promise<{ ok: true }> {
  return requestOtpCodeMock();
}

export async function confirmTransferOtpMock(code: string) {
  return verifyOtpMock(code);
}
