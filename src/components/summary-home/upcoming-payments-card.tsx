import Image from 'next/image';
import Link from 'next/link';

/**
 * Tarjeta «3 pagos próximos» — Figma 36:1820: sin sombra, rounded 12px.
 */
export function UpcomingPaymentsCard() {
  return (
    <section
      aria-labelledby="upcoming-payments-heading"
      className="mt-6 flex h-[68px] w-full items-center justify-between rounded-[12px] bg-white px-3 py-4"
    >
      <h2 id="upcoming-payments-heading" className="sr-only">
        Pagos próximos
      </h2>
      <div className="flex items-center gap-4">
        <div
          className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-[#d1e4f0]"
          aria-hidden
        >
          <Image
            src="/summary-figma/credit-card.svg"
            alt=""
            width={24}
            height={24}
            unoptimized
            className="shrink-0 object-contain object-center"
            style={{ width: '24px', height: '24px' }}
            sizes="24px"
          />
        </div>
        <div className="flex flex-col gap-0 text-xs leading-5">
          <span className="font-normal text-[#1a1a1a]">3 pagos próximos</span>
          <Link href="/pay-qr" className="font-semibold text-[#0067ae] hover:underline">
            Ver pagos
          </Link>
        </div>
      </div>
      <p className="shrink-0 text-right text-xs font-normal leading-5 text-[#1a1a1a]">$47.00</p>
    </section>
  );
}
