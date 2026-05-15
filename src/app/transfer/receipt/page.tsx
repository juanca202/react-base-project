'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTransferFlow } from '@/features/transfers/context/transfer-flow-context';
import { maskAccountNumber, accountTypeLabel } from '@/features/transfers/utils/mask-account';

function CheckCircleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <circle cx="13" cy="13" r="13" fill="var(--color-primary)" />
      <path
        d="M7.5 13.5L11 17L18.5 9.5"
        stroke="white"
        strokeWidth="2"
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

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="15" cy="4" r="2" stroke="white" strokeWidth="1.5" />
      <circle cx="15" cy="16" r="2" stroke="white" strokeWidth="1.5" />
      <circle cx="5" cy="10" r="2" stroke="white" strokeWidth="1.5" />
      <path d="M7 9L13 5.5M7 11L13 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
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

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  const months = [
    'ene.',
    'feb.',
    'mar.',
    'abr.',
    'may.',
    'jun.',
    'jul.',
    'ago.',
    'sep.',
    'oct.',
    'nov.',
    'dic.'
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'p.m.' : 'a.m.';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${day} ${month} ${year}, ${hour12}:${minutes} ${period}`;
}

function buildReceiptText(params: {
  receiptId: string;
  timestamp: string;
  amount: number;
  fromLabel: string;
  fromMasked: string;
  toLabel: string;
  toMasked: string;
}): string {
  const { receiptId, timestamp, amount, fromLabel, fromMasked, toLabel, toMasked } = params;
  return [
    'Comprobante de transferencia',
    `Comprobante: ${receiptId}`,
    `Monto: ${formatCurrency(amount)}`,
    `Desde: ${fromLabel} ${fromMasked}`,
    `Hacia: ${toLabel} ${toMasked}`,
    `Fecha: ${formatTimestamp(timestamp)}`
  ].join('\n');
}

export default function TransferReceiptPage() {
  const router = useRouter();
  const { fromAccount, toAccount, amount, concept, receipt, reset } = useTransferFlow();

  const [copiedFeedback, setCopiedFeedback] = useState(false);

  useEffect(() => {
    if (!fromAccount || !toAccount || amount === null || !receipt) {
      router.replace('/transfer');
    }
  }, [fromAccount, toAccount, amount, receipt, router]);

  if (!fromAccount || !toAccount || amount === null || !receipt) {
    return null;
  }

  const receiptText = buildReceiptText({
    receiptId: receipt.receiptId,
    timestamp: receipt.timestamp,
    amount,
    fromLabel: accountTypeLabel(fromAccount.type),
    fromMasked: maskAccountNumber(fromAccount.number),
    toLabel: accountTypeLabel(toAccount.type),
    toMasked: maskAccountNumber(toAccount.number)
  });

  async function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'Comprobante de transferencia', text: receiptText });
        return;
      } catch {
        // fallback to clipboard if share is cancelled or fails
      }
    }
    try {
      await navigator.clipboard.writeText(receiptText);
      setCopiedFeedback(true);
      setTimeout(() => setCopiedFeedback(false), 2500);
    } catch {
      // silently ignore clipboard errors
    }
  }

  function handleNewTransfer() {
    reset();
    router.push('/transfer');
  }

  function handleGoHome() {
    reset();
    router.push('/summary');
  }

  return (
    <main className="flex min-h-dvh flex-col bg-[#f2f3f7]">
      <div className="mx-auto flex w-full max-w-[360px] flex-col gap-6 px-6 pb-10 pt-14">
        {/* Título */}
        <h1 className="text-[18px] font-normal leading-7 text-[#1a1a1a]">COMPROBANTE</h1>

        {/* Tarjeta de comprobante */}
        <div className="relative overflow-hidden rounded-[12px] bg-white shadow-[0px_8px_16px_rgba(0,0,0,0.02)]">
          {/* Patrón decorativo del logo — fondo superior */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[150px] overflow-hidden rounded-t-[12px]"
            aria-hidden="true"
          >
            {[
              { left: '-8px', top: '-12px', rotate: '-30deg' },
              { left: '72px', top: '-12px', rotate: '-30deg' },
              { left: '152px', top: '-12px', rotate: '-30deg' },
              { left: '232px', top: '-12px', rotate: '-30deg' },
              { left: '-44px', top: '54px', rotate: '-30deg' },
              { left: '36px', top: '54px', rotate: '-30deg' },
              { left: '116px', top: '54px', rotate: '-30deg' },
              { left: '196px', top: '54px', rotate: '-30deg' },
              { left: '-20px', top: '120px', rotate: '-30deg' },
              { left: '60px', top: '120px', rotate: '-30deg' },
              { left: '140px', top: '120px', rotate: '-30deg' },
              { left: '220px', top: '120px', rotate: '-30deg' }
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: pos.left,
                  top: pos.top,
                  transform: `rotate(${pos.rotate})`,
                  opacity: 0.08
                }}
              >
                <Image
                  src="/brand/figma-login/logo.svg"
                  alt=""
                  width={80}
                  height={28}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Contenido de la tarjeta */}
          <div className="relative flex flex-col items-center gap-2 px-4 pb-5 pt-8">
            {/* Logo del banco */}
            <div className="mb-1 h-[17px]">
              <Image
                src="/brand/figma-login/logo.svg"
                alt="Banco Bolivariano"
                width={118}
                height={17}
                className="object-contain"
              />
            </div>

            {/* Ícono de check */}
            <div className="flex items-center justify-center rounded-full border border-[#d6d6d6] bg-white p-[3px] shadow-[0px_0.5px_0.5px_rgba(0,0,0,0.05)]">
              <CheckCircleIcon />
            </div>

            {/* Mensaje de éxito */}
            <p className="text-[12px] leading-5 text-[var(--color-primary)]">
              ¡Transferencia exitosa!
            </p>

            {/* Monto */}
            <p className="text-[18px] leading-7 text-[#1a1c1c]">{formatCurrency(amount)}</p>

            {/* Número de comprobante */}
            <p className="text-[8px] leading-5 text-[#3e494b]">Comprobante {receipt.receiptId}</p>

            {/* Fecha y hora */}
            <p className="text-[10px] leading-5 text-[#3e494b]">
              {formatTimestamp(receipt.timestamp)}
            </p>

            {/* Separador */}
            <div className="mt-2 w-full border-b border-[#e2e2e2]" />

            {/* Cuenta origen */}
            <div className="flex w-full items-center gap-4 border-b border-[#e2e2e2] px-3 py-4">
              <div className="flex shrink-0 items-center justify-center rounded-[8px] bg-[#d0f0f6] p-2 text-[var(--color-primary)]">
                <WalletIcon />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[12px] leading-5 text-[#474747]">Desde</span>
                <span className="text-[14px] leading-normal text-[#474747]">
                  {fromAccount.name ?? accountTypeLabel(fromAccount.type)}
                </span>
                <span className="text-[12px] leading-5 text-[#757575]">
                  {accountTypeLabel(fromAccount.type)} {maskAccountNumber(fromAccount.number)}
                </span>
              </div>
            </div>

            {/* Cuenta destino */}
            <div className="flex w-full items-center gap-4 border-b border-[#e2e2e2] px-3 py-4">
              <div className="flex shrink-0 items-center justify-center rounded-[8px] bg-[#d0f0f6] p-2 text-[var(--color-primary)]">
                <UserIcon />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[12px] leading-5 text-[#474747]">Hacia</span>
                <span className="text-[14px] leading-normal text-[#474747]">
                  {toAccount.name ?? accountTypeLabel(toAccount.type)}
                </span>
                <span className="text-[12px] leading-5 text-[#757575]">
                  {accountTypeLabel(toAccount.type)} {maskAccountNumber(toAccount.number)}
                </span>
              </div>
            </div>

            {/* Concepto (condicional) */}
            {concept && (
              <div className="flex w-full items-center justify-between border-b border-[#e2e2e2] px-4 py-[13px]">
                <span className="text-[14px] leading-5 text-[#474747]">Concepto</span>
                <span className="text-[12px] leading-5 text-[var(--color-primary)]">{concept}</span>
              </div>
            )}

            {/* Comisión */}
            <div className="flex w-full items-center justify-between px-4 py-[13px]">
              <span className="text-[14px] leading-5 text-[#474747]">Comisión</span>
              <span className="text-[12px] leading-5 text-[var(--color-primary)]">$0.00</span>
            </div>
          </div>
        </div>

        {/* Feedback de copiado */}
        {copiedFeedback && (
          <p
            role="status"
            className="text-center text-[12px] leading-5 text-[var(--color-primary)]"
          >
            ¡Copiado al portapapeles!
          </p>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col gap-3">
          {/* Compartir */}
          <button
            type="button"
            onClick={handleShare}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] bg-[var(--color-primary)] px-4 py-3 text-[14px] font-semibold leading-[22px] text-white transition-colors hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]"
          >
            Compartir
            <ShareIcon />
          </button>

          {/* Nueva transferencia */}
          <button
            type="button"
            onClick={handleNewTransfer}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border border-[var(--color-primary)] bg-white px-4 py-3 text-[14px] font-semibold leading-[22px] text-[var(--color-primary)] shadow-[0px_4px_4px_0px_#e2e2e2] transition-colors hover:bg-[var(--color-surface-alt)]"
          >
            Nueva transferencia
          </button>

          {/* Ir al inicio */}
          <button
            type="button"
            onClick={handleGoHome}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] px-4 py-3 text-[14px] font-semibold leading-[22px] text-[var(--color-primary)] drop-shadow-[0px_4px_2px_#e2e2e2] hover:underline"
          >
            Ir al inicio
          </button>
        </div>
      </div>
    </main>
  );
}
