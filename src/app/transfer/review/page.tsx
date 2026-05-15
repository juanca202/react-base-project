'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTransferFlow } from '@/features/transfers/context/transfer-flow-context';
import { maskAccountNumber, accountTypeLabel } from '@/features/transfers/utils/mask-account';

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

function TransferIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 8l-3 3 3 3M15 12l3-3-3-3M2 11h16"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
}

export default function TransferReviewPage() {
  const router = useRouter();
  const { fromAccount, toAccount, amount, concept, setReceipt, reset } = useTransferFlow();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!fromAccount || !toAccount || amount === null) {
      router.replace('/transfer');
    }
  }, [fromAccount, toAccount, amount, router]);

  if (!fromAccount || !toAccount || amount === null) {
    return null;
  }

  async function handleTransfer() {
    if (!fromAccount || !toAccount || amount === null) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceAccountNumber: fromAccount.number,
          targetAccountNumber: toAccount.number,
          routerNumber: '021000021',
          amount,
          description: concept || ''
        })
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? 'Ocurrió un error al procesar la transferencia.');
        return;
      }

      const receiptId = `TRF-${Date.now()}`;
      const timestamp = new Date().toISOString();
      setReceipt({ receiptId, timestamp });
      router.push('/transfer/receipt');
    } catch {
      setError('No se pudo conectar al servidor. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    reset();
    router.push('/transfer');
  }

  return (
    <main className="flex min-h-dvh flex-col bg-[#f2f3f7]">
      <div className="mx-auto flex w-full max-w-[360px] flex-col gap-6 px-6 pb-10 pt-14">
        {/* Encabezado */}
        <div className="flex flex-col gap-[15px]">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Volver"
            className="h-5 w-5 cursor-pointer text-[var(--color-text-emphasis)]"
          >
            <ArrowLeftIcon />
          </button>
          <h1 className="text-[18px] font-normal leading-7 text-[#1a1a1a]">
            REVISAR TRANSFERENCIA
          </h1>
        </div>

        {/* Tarjeta de resumen */}
        <div className="flex flex-col gap-3 rounded-[12px] bg-white p-3">
          {/* Monto */}
          <p className="text-center text-[12px] font-semibold leading-5 text-[#3e494b]">
            Monto a enviar
          </p>
          <div className="flex items-center justify-center">
            <span className="text-[50px] font-normal leading-[60px] text-[#1a1a1a]">
              {formatCurrency(amount)}
            </span>
          </div>

          {/* Badge inmediato */}
          <div className="flex items-center justify-center rounded-[12px] bg-[#d0f0f6] px-1 py-0.5">
            <span className="text-[12px] font-normal leading-5 text-[#474747]">
              La transferencia se realizará de inmediato
            </span>
          </div>

          {/* Cuenta origen */}
          <div className="flex items-center gap-4 rounded-br-[12px] rounded-tr-[12px] bg-white px-3 py-4">
            <div className="flex shrink-0 items-center justify-center rounded-[8px] bg-[#d0f0f6] p-2 text-[var(--color-primary)]">
              <WalletIcon />
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div className="flex flex-col items-start">
                <span className="text-[12px] leading-5 text-[#757575]">Desde</span>
                <span className="text-[14px] leading-[normal] text-[#474747]">
                  {fromAccount.name ?? accountTypeLabel(fromAccount.type)}
                </span>
                <span className="text-[12px] leading-5 text-[#757575]">
                  {accountTypeLabel(fromAccount.type)} {maskAccountNumber(fromAccount.number)}
                </span>
              </div>
              <span className="text-[12px] font-semibold leading-5 text-[#474747]">
                {formatCurrency(fromAccount.balance)}
              </span>
            </div>
          </div>

          {/* Cuenta destino */}
          <div className="flex items-center gap-4 rounded-[12px] bg-white px-3 py-4">
            <div className="flex shrink-0 items-center justify-center rounded-[8px] bg-[#d0f0f6] p-2 text-[var(--color-primary)]">
              <WalletIcon />
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div className="flex flex-col items-start">
                <span className="text-[12px] leading-5 text-[#474747]">Hacia</span>
                <span className="text-[14px] leading-[normal] text-[#474747]">
                  {toAccount.name ?? accountTypeLabel(toAccount.type)}
                </span>
                <span className="text-[12px] leading-5 text-[#757575]">
                  {accountTypeLabel(toAccount.type)} {maskAccountNumber(toAccount.number)}
                </span>
              </div>
              <span className="text-[12px] font-semibold leading-5 text-[#474747]">
                {formatCurrency(toAccount.balance)}
              </span>
            </div>
          </div>

          {/* Concepto */}
          {concept && (
            <div className="flex items-center justify-between border-b border-[#eee] px-1 pb-[13px] pt-3">
              <span className="text-[14px] leading-5 text-[#474747]">Concepto</span>
              <span className="text-[12px] leading-5 text-[var(--color-primary)]">{concept}</span>
            </div>
          )}

          {/* Comisión */}
          <div className="flex items-center justify-between border-b border-[#eee] px-1 pb-[13px] pt-3">
            <span className="text-[14px] leading-5 text-[#474747]">Comisión</span>
            <span className="text-[12px] leading-5 text-[var(--color-primary)]">$0.00</span>
          </div>
        </div>

        {/* Error inline */}
        {error && (
          <p role="alert" className="text-center text-[12px] leading-5 text-[var(--color-error)]">
            {error}
          </p>
        )}

        {/* Botón Transferir */}
        <button
          type="button"
          onClick={handleTransfer}
          disabled={loading}
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] bg-[var(--color-primary)] px-4 py-3 text-[14px] font-semibold leading-[22px] text-white transition-colors hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Procesando...' : 'Transferir'}
          {!loading && <TransferIcon />}
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
    </main>
  );
}
