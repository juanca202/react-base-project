'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Account } from '@/app/api/accounts/route';
import { useTransferFlow } from '@/features/transfers/context/transfer-flow-context';
import { AccountSelectDialog } from '@/features/transfers/components/account-select-dialog';
import { maskAccountNumber, accountTypeLabel } from '@/features/transfers/utils/mask-account';

type DialogMode = 'from' | 'to' | null;

function ArrowLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M14 5H2a1 1 0 00-1 1v7a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 2H4a1 1 0 00-1 1v2h10V3a1 1 0 00-1-1h-1z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="9.5" r="1" fill="currentColor" />
    </svg>
  );
}

function AnglesDownIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 8l5 5 5-5"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 13l5 5 5-5"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AccountButton({
  label,
  account,
  onClick
}: {
  label: string;
  account: Account | null;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-4 rounded-[12px] bg-white px-3 py-4 text-left transition-shadow hover:shadow-[var(--shadow-sm)] active:opacity-90"
    >
      <div className="flex shrink-0 items-center justify-center rounded-[8px] bg-[#d0f0f6] p-2">
        <WalletIcon />
      </div>
      <div className="flex flex-1 items-center justify-between gap-3">
        <div className="flex flex-col items-start">
          <span className="text-[12px] leading-5 text-[#757575]">{label}</span>
          {account ? (
            <>
              <span className="text-[14px] leading-[normal] text-[#474747]">
                {account.name ?? accountTypeLabel(account.type)}
              </span>
              <span className="text-[12px] leading-5 text-[#757575]">
                {accountTypeLabel(account.type)} {maskAccountNumber(account.number)}
              </span>
            </>
          ) : (
            <span className="text-[14px] leading-[normal] text-[#9f9f9f]">Seleccionar cuenta</span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {account && (
            <span className="text-[12px] font-semibold leading-5 text-[#474747]">
              {account.balance.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
              })}
            </span>
          )}
          <ArrowRightSmallIcon />
        </div>
      </div>
    </button>
  );
}

export default function TransferFormPage() {
  const router = useRouter();
  const {
    fromAccount,
    toAccount,
    setAccounts,
    setFromAccount,
    setToAccount,
    setAmount,
    setConcept,
    reset
  } = useTransferFlow();

  const [accounts, setLocalAccounts] = useState<Account[]>([]);
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [amountStr, setAmountStr] = useState('');
  const [conceptStr, setConceptStr] = useState('');
  const [amountError, setAmountError] = useState('');

  useEffect(() => {
    fetch('/api/accounts')
      .then((r) => r.json())
      .then((data: Account[]) => {
        const filtered = data.filter((a) => a.type === 'saving' || a.type === 'checking');
        setLocalAccounts(filtered);
        setAccounts(filtered);
      })
      .catch(() => {});
  }, [setAccounts]);

  function handleContinue() {
    const parsed = parseFloat(amountStr.replace(',', '.'));
    if (!fromAccount || !toAccount) return;
    if (!amountStr || isNaN(parsed) || parsed <= 0) {
      setAmountError('Ingresa un monto mayor a $0.00');
      return;
    }
    setAmountError('');
    setAmount(parsed);
    setConcept(conceptStr.trim());
    router.push('/transfer/review');
  }

  function handleCancel() {
    reset();
    router.push('/transfer');
  }

  return (
    <main className="relative flex min-h-dvh flex-col bg-gradient-to-b from-[#adcee5] to-[#f2f3f7]">
      <div className="mx-auto flex w-full max-w-[360px] flex-col gap-6 px-6 pb-10 pt-14">
        {/* Encabezado */}
        <div className="flex flex-col gap-[15px]">
          <button
            type="button"
            onClick={() => router.push('/transfer')}
            aria-label="Volver"
            className="h-5 w-5 cursor-pointer text-[var(--color-text-emphasis)]"
          >
            <ArrowLeftIcon />
          </button>
          <h1 className="text-[18px] font-normal leading-7 text-[#1a1a1a]">TRANSFERIR</h1>
        </div>

        {/* Sección de cuentas */}
        <div className="flex flex-col gap-6">
          {/* Botones Desde / Hacia con ícono entre ellos */}
          <div className="relative grid grid-rows-[1fr_1fr]">
            <div className="flex flex-col gap-6">
              <AccountButton
                label="Desde"
                account={fromAccount}
                onClick={() => setDialogMode('from')}
              />
              <AccountButton
                label="Hacia"
                account={toAccount}
                onClick={() => setDialogMode('to')}
              />
            </div>
            {/* Ícono angles-down superpuesto entre los dos botones */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-[#d0f0f6] p-4"
              aria-hidden="true"
            >
              <AnglesDownIcon />
            </div>
          </div>

          {/* Campo de monto */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-center">
              <label
                htmlFor="transfer-amount"
                className="text-[16px] font-normal leading-6 text-[#474747]"
              >
                Ingresa el monto a transferir
              </label>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[280px]">
                <input
                  id="transfer-amount"
                  type="number"
                  inputMode="decimal"
                  min="0.01"
                  step="0.01"
                  value={amountStr}
                  onChange={(e) => {
                    setAmountStr(e.target.value);
                    if (amountError) setAmountError('');
                  }}
                  placeholder="$0.00"
                  aria-describedby={amountError ? 'amount-error' : undefined}
                  className="w-full border-0 border-b border-[var(--color-primary)] bg-transparent px-3 py-2 text-center text-[50px] font-normal leading-[60px] text-[#1a1a1a] outline-none placeholder:text-[#9f9f9f]"
                />
              </div>
            </div>
            {amountError && (
              <p
                id="amount-error"
                role="alert"
                className="text-center text-[12px] leading-5 text-[var(--color-error)]"
              >
                {amountError}
              </p>
            )}
          </div>
        </div>

        {/* Detalle de transacción */}
        <div className="flex flex-col gap-6">
          {/* Campo Concepto */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="transfer-concept"
              className="text-[12px] font-semibold leading-5 text-[#3e494b]"
            >
              Concepto <span className="font-normal text-[#757575]">(Opcional)</span>
            </label>
            <div className="overflow-hidden rounded-[8px] bg-white px-4 py-[17px]">
              <input
                id="transfer-concept"
                type="text"
                value={conceptStr}
                onChange={(e) => setConceptStr(e.target.value)}
                placeholder="Ej. Pago zapatos"
                className="w-full bg-transparent text-[14px] font-normal leading-[normal] text-[var(--color-text-primary)] outline-none placeholder:text-[#c8c8c8]"
              />
            </div>
          </div>

          {/* Botón Continuar */}
          <button
            type="button"
            onClick={handleContinue}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] bg-[var(--color-primary)] px-4 py-3 text-[14px] font-semibold leading-[22px] text-white transition-colors hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]"
          >
            Continuar
            <ArrowRightIcon />
          </button>

          {/* Botón Cancelar */}
          <button
            type="button"
            onClick={handleCancel}
            className="cursor-pointer text-center text-[14px] font-semibold leading-[22px] text-[var(--color-primary)] hover:underline"
          >
            Cancelar
          </button>
        </div>
      </div>

      {/* Diálogo de selección de cuenta */}
      <AccountSelectDialog
        open={dialogMode !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setDialogMode(null);
        }}
        accounts={accounts}
        selectedAccount={dialogMode === 'from' ? fromAccount : toAccount}
        onSelect={(account) => {
          if (dialogMode === 'from') {
            setFromAccount(account);
          } else {
            setToAccount(account);
          }
          setDialogMode(null);
        }}
        title="CUENTAS"
      />
    </main>
  );
}
