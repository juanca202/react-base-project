'use client';

import { useEffect, useRef } from 'react';
import { FigmaResumenIcon } from '@/features/landing/ui/figma-resumen-icon';
import type { TransferDemoAccount } from '@/features/transferencias/mock/demo-accounts';
import { formatCurrencyEs } from '@/features/transferencias/ui/transfer-format';

type TransferAccountPickerModalProps = {
  open: boolean;
  titleId: string;
  accounts: TransferDemoAccount[];
  selectedAccountNumber: string | null;
  onSelect: (accountNumber: string) => void;
  onClose: () => void;
};

export function TransferAccountPickerModal({
  open,
  titleId,
  accounts,
  selectedAccountNumber,
  onSelect,
  onClose
}: TransferAccountPickerModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[rgb(0_0_0_/0.4)]"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-[360px] rounded-t-[12px] bg-[var(--color-bg-tertiary)] pb-3 shadow-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-16 w-full items-center justify-center rounded-t-[12px] border-b border-[var(--color-border-default)] bg-white/90 backdrop-blur-[6px]">
          <div className="relative flex w-[190px] items-center justify-center">
            <p id={titleId} className="text-center text-[14px] font-normal text-black">
              CUENTAS
            </p>
            <button
              ref={closeBtnRef}
              type="button"
              className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center justify-center p-1"
              aria-label="Cerrar"
              onClick={onClose}
            >
              <FigmaResumenIcon
                src="/figma-transfer/icon-xmark.svg"
                width={20}
                height={20}
                alt=""
              />
            </button>
          </div>
        </div>
        <div className="flex max-h-[min(70vh,520px)] flex-col gap-150 overflow-y-auto px-300 pb-300 pt-200">
          {accounts.map((acc) => {
            const selected = acc.accountNumber === selectedAccountNumber;
            const disabled = !acc.selectable;
            return (
              <button
                key={acc.id}
                type="button"
                disabled={disabled}
                onClick={() => {
                  if (disabled) return;
                  onSelect(acc.accountNumber);
                  onClose();
                }}
                className={`flex w-full items-center justify-between rounded-[12px] px-400 py-300 text-left ${
                  disabled
                    ? 'cursor-not-allowed bg-[#e2e2e2] opacity-40'
                    : selected
                      ? 'border border-[var(--color-bg-brand)] bg-[#d0f0f6]'
                      : 'bg-white'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-normal text-[#474747]">{acc.displayName}</p>
                  <p className="text-[12px] leading-5 text-[#757575]">{acc.maskedLine}</p>
                </div>
                <div className="shrink-0 text-right text-[12px] leading-5">
                  <p className="font-normal text-[#474747]">{formatCurrencyEs(acc.balance)}</p>
                  <p className="text-[#757575]">Saldo disponible</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
