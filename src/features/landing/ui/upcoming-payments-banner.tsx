import { FigmaResumenIcon } from '@/features/landing/ui/figma-resumen-icon';
import Link from 'next/link';

/** Banner «3 pagos próximos»: círculo 32px, icono tarjeta 24px (Figma 36:1822–1823). */
export function UpcomingPaymentsBanner() {
  return (
    <section className="mb-6">
      <div className="flex h-[68px] items-center justify-between rounded-[12px] bg-white px-3 py-4 shadow-[0_20px_40px_rgb(11_81_92_/_0.12)]">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#d1e4f0]">
            <FigmaResumenIcon src="/figma-resumen/icon-credit-card.svg" width={24} height={24} />
          </span>
          <div className="min-w-0">
            <p className="m-0 text-[length:var(--text-caption-size)] font-normal leading-5 text-[#1a1a1a]">
              3 pagos próximos
            </p>
            <Link
              href="/proximos-pagos"
              className="m-0 text-[length:var(--text-caption-size)] font-semibold leading-5 text-[#0067ae]"
            >
              Ver pagos
            </Link>
          </div>
        </div>
        <p className="m-0 shrink-0 text-[length:var(--text-caption-size)] font-normal tabular-nums leading-5 text-[#1a1a1a]">
          $47.00
        </p>
      </div>
    </section>
  );
}
