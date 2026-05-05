'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DEMO_TRANSFER_TYPE = 'between-accounts';

export function TransferTypeSelector() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedType) {
      return;
    }

    router.push(`/transfers/${selectedType}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset className="space-y-3">
        <legend className="text-[32px] leading-[0] sr-only">Tipo de transferencia</legend>
        <p className="text-[16px] leading-[24px] text-[#474747]">Transferir mi dinero</p>

        <label
          className={`flex cursor-pointer items-center justify-between rounded-[12px] bg-white p-4 ${
            selectedType === DEMO_TRANSFER_TYPE ? 'ring-1 ring-(--color-bg-brand)' : ''
          }`}
        >
          <input
            type="radio"
            name="transfer-type"
            value={DEMO_TRANSFER_TYPE}
            checked={selectedType === DEMO_TRANSFER_TYPE}
            onChange={(event) => setSelectedType(event.target.value)}
            className="sr-only"
          />
          <span className="flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-[8px] bg-[#d0f0f6] text-(--color-text-brand)">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
                <path
                  d="M7 8l-3 3 3 3M17 8l3 3-3 3M4 11h5m6 0h5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="flex flex-col">
              <span className="text-[16px] font-semibold leading-[24px] text-black">
                Entre mis cuentas
              </span>
              <span className="max-w-[190px] text-[14px] leading-[20px] text-[#3e494b]">
                Transfiere dinero de forma inmediata.
              </span>
            </span>
          </span>
          <span className="text-black" aria-hidden>
            <svg viewBox="0 0 24 24" className="size-4" fill="none">
              <path
                d="M8 5l8 7-8 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </label>

        <div className="flex items-center justify-between rounded-[12px] bg-white p-4 opacity-40">
          <span className="flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-[8px] bg-[#d0f0f6] text-(--color-text-brand)">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
                <path
                  d="M6 16a4 4 0 118 0m4 0a3 3 0 10-6 0m2-7a3 3 0 11.001-6.001A3 3 0 0114 9zm-8 1a3 3 0 100-6 3 3 0 000 6z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="flex flex-col">
              <span className="text-[16px] font-semibold leading-[24px] text-black">
                A terceros
              </span>
              <span className="max-w-[190px] text-[14px] leading-[20px] text-[#3e494b]">
                Transfiere dinero a otros beneficiarios.
              </span>
            </span>
          </span>
          <span className="text-black" aria-hidden>
            <svg viewBox="0 0 24 24" className="size-4" fill="none">
              <path
                d="M8 5l8 7-8 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={!selectedType}
        className="w-full rounded-[8px] bg-(--color-bg-brand) px-4 py-3 text-[14px] font-semibold leading-[22px] text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continuar
      </button>
    </form>
  );
}
