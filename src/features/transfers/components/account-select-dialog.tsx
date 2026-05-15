'use client';

import { Dialog } from '@base-ui/react';
import type { Account } from '@/app/api/accounts/route';
import { maskAccountNumber, accountTypeLabel } from '../utils/mask-account';

type AccountSelectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accounts: Account[];
  selectedAccount: Account | null;
  onSelect: (account: Account) => void;
  title?: string;
};

function XmarkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M15 5L5 15M5 5l10 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AccountSelectDialog({
  open,
  onOpenChange,
  accounts,
  selectedAccount,
  onSelect,
  title = 'CUENTAS'
}: AccountSelectDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/40" />
        <Dialog.Popup
          className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[12px] bg-[#f2f3f7] pb-3 outline-none"
          aria-labelledby="account-dialog-title"
        >
          {/* Cabecera */}
          <div className="relative flex h-16 items-center justify-center rounded-t-[12px] bg-white backdrop-blur-[6px]">
            <Dialog.Title
              id="account-dialog-title"
              className="text-[14px] font-normal leading-[normal] text-black"
            >
              {title}
            </Dialog.Title>
            <Dialog.Close
              className="absolute right-4 flex cursor-pointer items-center justify-center p-1 text-[var(--color-text-emphasis)] hover:opacity-70"
              aria-label="Cerrar"
            >
              <XmarkIcon />
            </Dialog.Close>
          </div>

          {/* Lista de cuentas */}
          <div className="flex flex-col gap-3 px-6 pt-6 pb-3">
            {accounts.map((account) => {
              const isSelected = selectedAccount?.id === account.id;
              const isDisabled = account.balance === 0;
              const typeLabel = accountTypeLabel(account.type);
              const masked = maskAccountNumber(account.number);
              const balanceStr = account.balance.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
              });

              return (
                <button
                  key={account.id}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => {
                    if (!isDisabled) {
                      onSelect(account);
                      onOpenChange(false);
                    }
                  }}
                  className={[
                    'flex w-full cursor-pointer items-center justify-between rounded-[12px] px-4 py-3 text-left transition-opacity',
                    isSelected
                      ? 'border border-[var(--color-primary)] bg-[#d0f0f6]'
                      : 'border border-transparent bg-white',
                    isDisabled ? 'cursor-not-allowed bg-[#e2e2e2] opacity-40' : ''
                  ]
                    .join(' ')
                    .trim()}
                >
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-[14px] leading-[normal] text-[#474747]">
                      {account.name ?? typeLabel}
                    </span>
                    <span className="text-[12px] leading-5 text-[#757575]">
                      {typeLabel} {masked}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[12px] leading-5 text-[#474747]">{balanceStr}</span>
                    <span className="text-[12px] leading-5 text-[#757575]">Saldo disponible</span>
                  </div>
                </button>
              );
            })}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
