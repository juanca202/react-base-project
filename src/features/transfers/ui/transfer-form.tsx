'use client';

import { useMemo, useState } from 'react';
import type { Account } from '@/shared/contracts/accounts';
import type { TransferDraft } from '@/shared/contracts/transfers';
import { TRANSFER_FLOW_DRAFT_KEY } from '@/features/transfers/lib/flow-machine';

type TransferFormProps = {
  transferType: string;
  accounts: Account[];
  onValidSubmit: (draft: TransferDraft) => void;
  onCancel?: () => void;
};

type TransferErrors = {
  originAccountId?: string;
  destinationAccountId?: string;
  amount?: string;
};

function formatCurrency(value: number) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function getAccountDisplay(account: Account) {
  return account.name ?? `Cuenta ${account.number.slice(-4)}`;
}

export function TransferForm({
  transferType,
  accounts,
  onValidSubmit,
  onCancel
}: TransferFormProps) {
  const [originAccountId, setOriginAccountId] = useState('');
  const [destinationAccountId, setDestinationAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<TransferErrors>({});

  const originAccount = useMemo(
    () => accounts.find((account) => account.id === originAccountId),
    [accounts, originAccountId]
  );

  const destinationAccount = useMemo(
    () => accounts.find((account) => account.id === destinationAccountId),
    [accounts, destinationAccountId]
  );

  function validate(): TransferErrors {
    const nextErrors: TransferErrors = {};
    const parsedAmount = Number(amount);

    if (!originAccountId) {
      nextErrors.originAccountId = 'Selecciona una cuenta de origen.';
    }

    if (!destinationAccountId) {
      nextErrors.destinationAccountId = 'Selecciona una cuenta de destino.';
    }

    if (originAccountId && destinationAccountId && originAccountId === destinationAccountId) {
      nextErrors.destinationAccountId = 'La cuenta destino debe ser distinta a la cuenta origen.';
    }

    if (!amount.trim()) {
      nextErrors.amount = 'Ingresa un monto de transferencia.';
    } else if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      nextErrors.amount = 'El monto debe ser mayor que cero.';
    } else if (originAccount && parsedAmount > originAccount.balance) {
      nextErrors.amount = 'El monto supera el saldo disponible de la cuenta origen.';
    }

    return nextErrors;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !originAccount || !destinationAccount) {
      return;
    }

    const payload = {
      transferType,
      originAccountId,
      destinationAccountId,
      amount: Number(amount),
      description: description.trim()
    };

    sessionStorage.setItem(TRANSFER_FLOW_DRAFT_KEY, JSON.stringify(payload));
    onValidSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="rounded-[12px] bg-white p-3">
        <div className="space-y-3">
          <label htmlFor="origin-account" className="text-[12px] leading-[20px] text-[#757575]">
            Cuenta origen
          </label>
          <div className="flex items-center gap-3 rounded-[12px] bg-white">
            <span className="grid size-10 place-items-center rounded-[8px] bg-[#d0f0f6] text-(--color-text-brand)">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
                <path
                  d="M4 8h16v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8zm0 0l2-3h12l2 3M8 12h5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <select
                id="origin-account"
                value={originAccountId}
                onChange={(event) => setOriginAccountId(event.target.value)}
                className="w-full bg-transparent text-[14px] leading-[20px] text-[#474747] outline-none"
                aria-invalid={Boolean(errors.originAccountId)}
                aria-describedby={errors.originAccountId ? 'origin-account-error' : undefined}
              >
                <option value="">Selecciona una cuenta</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {getAccountDisplay(account)} - {account.number}
                  </option>
                ))}
              </select>
              {originAccount ? (
                <p className="text-[12px] leading-[20px] text-[#757575]">
                  Saldo disponible: {formatCurrency(originAccount.balance)}
                </p>
              ) : null}
            </div>
          </div>
          {errors.originAccountId ? (
            <p id="origin-account-error" role="alert" className="text-xs text-text-danger">
              {errors.originAccountId}
            </p>
          ) : null}
        </div>
      </div>

      <div className="rounded-[12px] bg-white p-3">
        <div className="space-y-3">
          <label
            htmlFor="destination-account"
            className="text-[12px] leading-[20px] text-[#757575]"
          >
            Cuenta destino
          </label>
          <div className="flex items-center gap-3 rounded-[12px] bg-white">
            <span className="grid size-10 place-items-center rounded-[8px] bg-[#d0f0f6] text-(--color-text-brand)">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
                <path
                  d="M12 12a3 3 0 100-6 3 3 0 000 6zm-5 7a5 5 0 1110 0"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <select
                id="destination-account"
                value={destinationAccountId}
                onChange={(event) => setDestinationAccountId(event.target.value)}
                className="w-full bg-transparent text-[14px] leading-[20px] text-[#474747] outline-none"
                aria-invalid={Boolean(errors.destinationAccountId)}
                aria-describedby={
                  errors.destinationAccountId ? 'destination-account-error' : undefined
                }
              >
                <option value="">Selecciona una cuenta</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {getAccountDisplay(account)} - {account.number}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {errors.destinationAccountId ? (
            <p id="destination-account-error" role="alert" className="text-xs text-text-danger">
              {errors.destinationAccountId}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <p className="text-center text-[16px] leading-[24px] text-[#474747]">
          Ingresa el monto a transferir
        </p>
        <div className="space-y-1 border-b border-(--color-bg-brand) px-3 pb-2">
          <label htmlFor="transfer-amount" className="sr-only">
            Monto
          </label>
          <input
            id="transfer-amount"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="0.00"
            className="w-full bg-transparent text-center text-[56px] leading-[60px] text-[#1a1a1a] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={errors.amount ? 'amount-error' : undefined}
          />
        </div>
        {errors.amount ? (
          <p id="amount-error" role="alert" className="text-xs text-text-danger">
            {errors.amount}
          </p>
        ) : null}
      </div>

      <div className="space-y-2 pt-2">
        <label
          htmlFor="transfer-description"
          className="text-[14px] font-semibold leading-[20px] text-[#474747]"
        >
          Concepto <span className="font-normal text-[#757575]">(Opcional)</span>
        </label>
        <textarea
          id="transfer-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={2}
          maxLength={120}
          className="w-full rounded-[8px] border border-white bg-white px-4 py-4 text-[14px] text-[#474747] outline-none placeholder:text-[#c8c8c8]"
          placeholder="Ej. Pago zapatos"
        />
      </div>

      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-(--color-bg-brand) px-4 text-[14px] font-semibold leading-[22px] text-white"
      >
        Continuar a verificación
        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
          <path
            d="M8 5l8 7-8 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {onCancel ? (
        <button
          type="button"
          onClick={onCancel}
          className="w-full py-2 text-center text-[14px] font-semibold leading-[22px] text-(--color-text-brand)"
        >
          Cancelar
        </button>
      ) : null}
    </form>
  );
}
