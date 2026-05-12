'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Navegación inferior — proporciones exactas Figma 36:1883-36:1899.
 * Cada icono tiene su tamaño específico según el export del MCP.
 */
const NAV = [
  { href: '/summary', label: 'Inicio', icon: '/summary-figma/nav-home.svg', w: 24, h: 25.6 },
  {
    href: '/transfer',
    label: 'Transferir',
    icon: '/summary-figma/nav-transfer.svg',
    w: 24,
    h: 25.6
  },
  { href: '/withdraw', label: 'Retirar', icon: '/summary-figma/nav-withdraw.svg', w: 24, h: 25.6 },
  { href: '/pay-qr', label: 'Pagos', icon: '/summary-figma/nav-payments.svg', w: 24, h: 25.6 },
  { href: '/services', label: 'Otros', icon: '/summary-figma/nav-more.svg', w: 24.787, h: 24.787 }
] as const;

/**
 * Barra inferior flotante, translúcida y con blur — Figma 36:1880 (h 64px, w 330px, rounded 24px).
 */
export function SummaryBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación principal"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center pb-[max(1.0625rem,env(safe-area-inset-bottom))] pt-2"
    >
      <div className="pointer-events-auto flex h-16 w-[min(330px,calc(100vw-2rem))] items-stretch justify-between rounded-[24px] border border-white bg-[rgba(255,255,255,0.05)] px-1.5 py-1 backdrop-blur-md">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-[24px] px-0.5 py-0.5 text-center text-[10px] leading-5 transition-colors ${
                active
                  ? 'bg-[#e5ebee] font-semibold text-[#008292]'
                  : 'bg-transparent font-normal text-[#757575] hover:text-[#474747]'
              }`}
            >
              <Image
                src={item.icon}
                alt=""
                width={item.w}
                height={item.h}
                unoptimized
                className="shrink-0 object-contain object-center"
                style={{ width: `${item.w}px`, height: `${item.h}px` }}
                sizes="24px"
              />
              <span className="max-w-full truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
