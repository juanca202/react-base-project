import Image from 'next/image';
import Link from 'next/link';

type FrequentPaymentsRowProps = {
  /** Texto del quinto acceso directo (en Figma: «Cristian Ramos»); en demo usamos el nombre mostrado. */
  lastActionLabel: string;
};

/**
 * Fila «Pagos frecuentes» — Figma 36:1801.
 * Círculo 46px, icono interior 25.556px con padding exacto 10.222px.
 */
export function FrequentPaymentsRow({ lastActionLabel }: FrequentPaymentsRowProps) {
  const items = [
    {
      href: '/services',
      label: 'Agua casa',
      src: '/summary-figma/droplet.svg',
      w: 25.556,
      h: 25.556
    },
    {
      href: '/pay-qr',
      label: 'Pago luz',
      src: '/summary-figma/lightbulb.svg',
      w: 25.556,
      h: 25.556
    },
    {
      href: '/transfer',
      label: 'Jannet Ruiz',
      src: '/summary-figma/user.svg',
      w: 25.556,
      h: 25.556
    },
    {
      href: '/services',
      label: 'Centro Educativo',
      src: '/summary-figma/school.svg',
      w: 25.556,
      h: 25.556
    },
    {
      href: '/transfer',
      label: lastActionLabel,
      src: '/summary-figma/user.svg',
      w: 25.556,
      h: 25.556
    }
  ] as const;

  return (
    <section aria-labelledby="frequent-payments-heading" className="w-full">
      <h2 id="frequent-payments-heading" className="sr-only">
        Pagos frecuentes
      </h2>
      <div className="flex gap-8 overflow-x-auto px-6 pb-1 [scrollbar-width:thin]">
        {items.map((item) => (
          <Link
            key={`${item.href}-${item.label}`}
            href={item.href}
            className="flex w-14 shrink-0 flex-col items-center gap-[3px] text-center focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#008292] focus-visible:ring-offset-2"
          >
            <span className="flex size-[46px] items-center justify-center rounded-[23px] border border-[#f2f3f7] bg-white p-[10.222px]">
              <Image
                src={item.src}
                alt=""
                width={item.w}
                height={item.h}
                unoptimized
                className="shrink-0 object-contain object-center"
                style={{ width: `${item.w}px`, height: `${item.h}px` }}
                sizes="26px"
              />
            </span>
            <span className="max-w-[4.5rem] truncate text-[10px] font-normal leading-[18.421px] text-[#1a1a1a]">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
