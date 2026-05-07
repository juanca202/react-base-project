'use client';

import { FigmaResumenIcon } from '@/features/landing/ui/figma-resumen-icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/resumen', label: 'Inicio', icon: '/figma-resumen/icon-house.svg' },
  { href: '/transferencias', label: 'Transferir', icon: '/figma-resumen/icon-transfer.svg' },
  { href: '/retirar', label: 'Retirar', icon: '/figma-resumen/icon-money.svg' },
  { href: '/pagos-qr', label: 'Pagos', icon: '/figma-resumen/icon-lightbulb.svg' },
  { href: '/servicios', label: 'Otros', icon: '/figma-resumen/icon-menu.svg' }
] as const;

/** Barra inferior: iconos ~24×25.6px según vectores del Home Figma (36:1883–1899). */
export function ResumenBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-[17px] left-1/2 z-50 flex h-16 w-[calc(100%-30px)] max-w-[330px] -translate-x-1/2 items-center justify-around rounded-[24px] border border-white bg-[rgb(255_255_255_/0.05)] px-2 pb-1 pt-1 backdrop-blur-sm"
      aria-label="Navegación principal"
    >
      {NAV_ITEMS.map(({ href, label, icon }) => {
        const highlighted = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`relative flex min-w-0 flex-1 flex-col items-center justify-end gap-0.5 rounded-[24px] px-1 pt-1 ${
              highlighted ? 'bg-[#e5ebee]' : ''
            }`}
          >
            <span className="relative flex h-[26px] w-6 items-center justify-center">
              <FigmaResumenIcon src={icon} width={24} height={26} />
            </span>
            <span
              className={`max-w-[56px] truncate text-center text-[10px] leading-5 ${
                highlighted
                  ? 'font-semibold text-[var(--color-text-brand)]'
                  : 'font-normal text-[#757575]'
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
