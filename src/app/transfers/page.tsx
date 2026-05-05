import Link from 'next/link';
import { TransferTypeSelector } from '@/features/transfers/ui/transfer-type-selector';

export default function TransfersPage() {
  return (
    <main className="relative min-h-full w-full overflow-hidden bg-[#f2f3f7] px-6 pb-10 pt-14">
      <div
        className="pointer-events-none absolute inset-x-0 top-[320px] h-[520px] bg-gradient-to-b from-[#d0f0f6] to-[#f2f3f7] opacity-70"
        aria-hidden
      />
      <div className="relative z-[1] mx-auto w-full max-w-[360px] space-y-6">
        <Link href="/" className="inline-flex text-[#1a1a1a]" aria-label="Volver al inicio">
          <svg viewBox="0 0 24 24" className="size-5" fill="none">
            <path
              d="M15 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h1 className="text-[32px] font-normal leading-[28px] tracking-[0.02em] text-[#1a1a1a]">
          TRANSFERENCIAS
        </h1>
        <TransferTypeSelector />
      </div>
    </main>
  );
}
