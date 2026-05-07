import { FigmaResumenIcon } from '@/features/landing/ui/figma-resumen-icon';
import Link from 'next/link';

const ITEMS = [
  { href: '/servicios', label: 'Agua casa', icon: '/figma-resumen/icon-droplet.svg' },
  { href: '/servicios', label: 'Pago luz', icon: '/figma-resumen/icon-lightbulb.svg' },
  { href: '/pagos-qr', label: 'Jannet Ruiz', icon: '/figma-resumen/icon-user.svg' },
  { href: '/servicios', label: 'Centro Educativo', icon: '/figma-resumen/icon-school.svg' },
  { href: '/transferencias', label: 'Cristian Ramos', icon: '/figma-resumen/icon-user.svg' }
] as const;

/** Fila «Pagos frecuentes»: círculo 46px, padding ~10.22px, glifo ~25.56px (Figma 36:1799). */
export function FrequentPaymentsRow() {
  return (
    <section aria-labelledby="pagos-frecuentes-heading" className="mb-6">
      <h2
        id="pagos-frecuentes-heading"
        className="m-0 mb-3 text-[0px] leading-[28px] text-[var(--color-neutral-very-dark)]"
      >
        <span className="text-[18px] font-normal leading-[28px] text-[#757575]">Pagos </span>
        <span className="text-[18px] font-semibold leading-[28px]">frecuentes</span>
      </h2>
      <nav className="-mx-2 flex gap-8 overflow-x-auto px-2 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ITEMS.map(({ href, label, icon }, index) => (
          <Link
            key={`${index}-${label}`}
            href={href}
            className="flex w-14 shrink-0 flex-col items-center gap-[3px] text-center"
          >
            <span className="flex size-[46px] items-center justify-center rounded-[23px] border border-[#f2f3f7] bg-white p-[10.222px]">
              <FigmaResumenIcon src={icon} width={26} height={26} />
            </span>
            <span className="max-w-[56px] truncate text-[10px] font-normal leading-[18.421px] text-[#1a1a1a]">
              {label}
            </span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
