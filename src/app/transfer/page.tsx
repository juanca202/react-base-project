'use client';

import { useRouter } from 'next/navigation';
import { SummaryBottomNav } from '@/components/summary-home/summary-bottom-nav';

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

function ArrowsRetweetIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17 1l4 4-4 4"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 11V9a4 4 0 014-4h14"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 23l-4-4 4-4"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 13v2a4 4 0 01-4 4H3"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="9"
        cy="7"
        r="4"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 21v-2a4 4 0 00-3-3.87"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 3.13a4 4 0 010 7.75"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TransferSelectPage() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-dvh flex-col bg-gradient-to-b from-[#f2f3f7] to-[#d0f0f6]">
      <div className="mx-auto flex w-full max-w-[360px] flex-col gap-4 px-6 pb-28 pt-14">
        {/* Encabezado */}
        <div className="flex flex-col gap-[15px]">
          <button
            onClick={() => router.push('/summary')}
            aria-label="Volver"
            className="h-5 w-5 cursor-pointer text-[var(--color-text-emphasis)]"
          >
            <ArrowLeftIcon />
          </button>
          <h1 className="text-[18px] font-normal leading-7 text-[#1a1a1a]">TRANSFERENCIAS</h1>
        </div>

        {/* Subtítulo + opciones */}
        <div className="flex flex-col">
          <p className="text-base font-normal leading-6 text-[#474747]">Transferir mi dinero</p>

          {/* Opción: Entre mis cuentas — navega a /transfer/form */}
          <button
            onClick={() => router.push('/transfer/form')}
            className="mt-10 w-full rounded-[12px] bg-white p-4 text-left transition-shadow hover:shadow-[var(--shadow-sm)] active:opacity-90"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-[#d0f0f6]">
                <ArrowsRetweetIcon />
              </div>
              <div className="flex flex-1 items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-base font-semibold leading-6 text-black">
                    Entre mis cuentas
                  </span>
                  <span className="text-[14px] leading-snug text-[#3e494b]">
                    Transfiere dinero de forma inmediata.
                  </span>
                </div>
                <ChevronRightIcon />
              </div>
            </div>
          </button>

          {/* Opción: A terceros — visual únicamente, sin navegación (RN-03 US-003) */}
          <div
            role="button"
            aria-disabled="true"
            tabIndex={-1}
            className="mt-4 w-full rounded-[12px] bg-white p-4 opacity-100"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-[#d0f0f6]">
                <UsersIcon />
              </div>
              <div className="flex flex-1 items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-base font-semibold leading-6 text-black">A terceros</span>
                  <span className="text-[14px] leading-snug text-[#3e494b]">
                    Transfiere dinero a otros beneficiarios.
                  </span>
                </div>
                <ChevronRightIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SummaryBottomNav />
    </main>
  );
}
