'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Account } from '@/shared/contracts/accounts';
import type { TransferDraft, TransferReceipt } from '@/shared/contracts/transfers';
import { executeTransferMock } from '@/features/transfers/api/transfers-mock';
import {
  canTransition,
  TRANSFER_FLOW_DRAFT_KEY,
  type TransferStep
} from '@/features/transfers/lib/flow-machine';
import { TransferForm } from '@/features/transfers/ui/transfer-form';

type TransferFlowStageProps = {
  transferType: string;
  accounts: Account[];
};

function formatCurrency(value: number) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function getAccountLabel(accounts: Account[], accountId: string) {
  const account = accounts.find((item) => item.id === accountId);
  return account ? (account.name ?? account.number) : 'Cuenta no encontrada';
}

function maskAccount(accountLabel: string) {
  if (accountLabel.length <= 4) {
    return accountLabel;
  }
  return `${accountLabel.slice(0, 8)} **** *${accountLabel.slice(-3)}`;
}

export function TransferFlowStage({ transferType, accounts }: TransferFlowStageProps) {
  const router = useRouter();
  const [step, setStep] = useState<TransferStep>('form');
  const [draft, setDraft] = useState<TransferDraft | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const serializedDraft = sessionStorage.getItem(TRANSFER_FLOW_DRAFT_KEY);
    if (!serializedDraft) {
      return null;
    }

    try {
      const parsed = JSON.parse(serializedDraft) as TransferDraft;
      if (!parsed.originAccountId || !parsed.destinationAccountId || !parsed.amount) {
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  });
  const [receipt, setReceipt] = useState<TransferReceipt | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function transitionTo(nextStep: TransferStep) {
    if (!canTransition(step, nextStep)) {
      return;
    }

    setStep(nextStep);
  }

  function resetFlow() {
    sessionStorage.removeItem(TRANSFER_FLOW_DRAFT_KEY);
    setDraft(null);
    setReceipt(null);
    setStep('form');
  }

  const summary = useMemo(() => {
    if (!draft) {
      return null;
    }

    return {
      origin: getAccountLabel(accounts, draft.originAccountId),
      destination: getAccountLabel(accounts, draft.destinationAccountId),
      amount: formatCurrency(draft.amount)
    };
  }, [accounts, draft]);

  async function handleConfirmTransfer() {
    if (!draft) {
      return;
    }

    setIsSubmitting(true);
    const result = await executeTransferMock(draft);
    setReceipt(result);
    transitionTo('success');
    setIsSubmitting(false);
  }

  if (step === 'form') {
    return (
      <TransferForm
        transferType={transferType}
        accounts={accounts}
        onValidSubmit={(nextDraft) => {
          setDraft(nextDraft);
          transitionTo('verification');
        }}
        onCancel={() => {
          resetFlow();
          router.push('/transfers');
        }}
      />
    );
  }

  if (step === 'verification' && draft && summary) {
    return (
      <section className="space-y-4">
        <h2 className="text-[32px] font-normal leading-[28px] tracking-[0.02em] text-[#1a1a1a]">
          REVISAR TRANSFERENCIA
        </h2>
        <div className="rounded-[12px] bg-white p-3">
          <h2 className="text-center text-[12px] font-semibold leading-[20px] text-[#3e494b]">
            Monto a enviar
          </h2>
          <p className="text-center text-[56px] leading-[60px] text-[#1a1c1c]">{summary.amount}</p>
          <p className="mx-auto mt-2 w-fit rounded-[12px] bg-[#d0f0f6] px-3 py-0.5 text-[12px] leading-[20px] text-[#474747]">
            La transferencia se realizará de inmediato
          </p>
          <dl className="mt-4 space-y-3">
            <div className="flex items-center gap-3 rounded-[12px] px-2 py-2">
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
              <div className="flex-1">
                <dt className="text-[12px] leading-[20px] text-[#757575]">Desde</dt>
                <dd className="text-[14px] leading-[20px] text-[#474747]">{summary.origin}</dd>
                <dd className="text-[12px] leading-[20px] text-[#757575]">
                  {maskAccount(summary.origin)}
                </dd>
              </div>
              <dd className="text-[12px] font-semibold leading-[20px] text-[#474747]">
                {summary.amount}
              </dd>
            </div>
            <div className="flex items-center gap-3 rounded-[12px] px-2 py-2">
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
              <div className="flex-1">
                <dt className="text-[12px] leading-[20px] text-[#757575]">Hacia</dt>
                <dd className="text-[14px] leading-[20px] text-[#474747]">{summary.destination}</dd>
                <dd className="text-[12px] leading-[20px] text-[#757575]">
                  {maskAccount(summary.destination)}
                </dd>
              </div>
              <dd className="text-[12px] font-semibold leading-[20px] text-[#474747]">
                {summary.amount}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-[#eeeeee] px-1 pt-3">
              <dt className="text-[14px] leading-[20px] text-[#474747]">Concepto</dt>
              <dd className="text-[12px] leading-[20px] text-(--color-text-brand)">
                {draft.description || '-'}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-[#eeeeee] px-1 pt-3">
              <dt className="text-[14px] leading-[20px] text-[#474747]">Comisión</dt>
              <dd className="text-[12px] leading-[20px] text-(--color-text-brand)">$0.00</dd>
            </div>
          </dl>
        </div>
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleConfirmTransfer}
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-(--color-bg-brand) px-4 text-[14px] font-semibold leading-[22px] text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Confirmando...' : 'Transferir'}
            <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
              <path
                d="M7 8l-3 3 3 3M17 8l3 3-3 3M4 11h5m6 0h5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => {
              resetFlow();
              router.push('/transfers');
            }}
            className="w-full py-2 text-center text-[14px] font-semibold leading-[22px] text-(--color-text-brand)"
          >
            Cancelar
          </button>
        </div>
      </section>
    );
  }

  if (step === 'success' && draft && receipt && summary) {
    return (
      <section className="space-y-4">
        <h2 className="text-[32px] font-normal leading-[28px] tracking-[0.02em] text-[#1a1a1a]">
          COMPROBANTE
        </h2>
        <div className="rounded-[12px] bg-white p-3">
          <div className="space-y-2 pb-3 text-center">
            <p className="text-[12px] leading-[20px] text-(--color-text-brand)">
              !Transferencia exitosa!
            </p>
            <h2 className="text-[40px] leading-[48px] text-[#1a1c1c]">{summary.amount}</h2>
            <p className="text-[10px] leading-[20px] text-[#3e494b]">
              Comprobante {receipt.operationId}
            </p>
            <p className="text-[10px] leading-[20px] text-[#3e494b]">
              {new Date(receipt.executedAt).toLocaleString('es-DO', { hour12: false })}
            </p>
          </div>
          <dl className="space-y-1">
            <div className="border-t border-[#e2e2e2] px-2 py-3">
              <dt className="text-[12px] leading-[20px] text-[#474747]">Desde</dt>
              <dd className="text-[14px] leading-[20px] text-[#474747]">{summary.origin}</dd>
              <dd className="text-[12px] leading-[20px] text-[#757575]">
                {maskAccount(summary.origin)}
              </dd>
            </div>
            <div className="border-t border-[#e2e2e2] px-2 py-3">
              <dt className="text-[12px] leading-[20px] text-[#474747]">Hacia</dt>
              <dd className="text-[14px] leading-[20px] text-[#474747]">{summary.destination}</dd>
              <dd className="text-[12px] leading-[20px] text-[#757575]">
                {maskAccount(summary.destination)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-[#e2e2e2] px-2 py-3">
              <dt className="text-[14px] leading-[20px] text-[#474747]">Concepto</dt>
              <dd className="text-[12px] leading-[20px] text-(--color-text-brand)">
                {draft.description || '-'}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-[#e2e2e2] px-2 py-3">
              <dt className="text-[14px] leading-[20px] text-[#474747]">Comisión</dt>
              <dd className="text-[12px] leading-[20px] text-(--color-text-brand)">$0.00</dd>
            </div>
          </dl>
        </div>
        <button
          type="button"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-(--color-bg-brand) px-4 text-[14px] font-semibold leading-[22px] text-white"
        >
          Compartir
          <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
            <path
              d="M15 8a3 3 0 10-2.83-4H12a3 3 0 00.17 1L8.91 8.28A3 3 0 006 7a3 3 0 100 6 3 3 0 002.91-3.72l3.26-3.26A3 3 0 0015 8zm0 8a3 3 0 00-2.83 2H12a3 3 0 00.17-1l-3.26-3.26A3 3 0 106 17a3 3 0 002.91-2.72l3.26 3.26A3 3 0 0015 16z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={resetFlow}
          className="h-12 w-full rounded-[8px] border border-(--color-bg-brand) bg-transparent px-4 text-[14px] font-semibold leading-[22px] text-(--color-text-brand)"
        >
          Nueva transferencia
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full py-2 text-center text-[14px] font-semibold leading-[22px] text-(--color-text-brand)"
        >
          Ir al inicio
        </button>
      </section>
    );
  }

  return null;
}
