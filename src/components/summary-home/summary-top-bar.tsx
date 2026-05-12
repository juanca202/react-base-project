import Image from 'next/image';
import Link from 'next/link';
import { LogoutButton } from '@/app/summary/logout-button';

export type SummaryTopBarProps = {
  displayName: string;
};

/**
 * Cabecera superior — Figma 36:1868–36:1878.
 * Iconos con proporciones exactas del export MCP.
 */
export function SummaryTopBar({ displayName }: SummaryTopBarProps) {
  const firstName = displayName.trim().split(/\s+/)[0] || displayName;

  return (
    <header className="flex items-start justify-between gap-3 pb-4 pt-2">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-2xl bg-[#94e0ed] p-2"
          aria-hidden
        >
          <Image
            src="/summary-figma/user-avatar.svg"
            alt=""
            width={16}
            height={16}
            unoptimized
            className="shrink-0"
            style={{ width: '16px', height: '16px' }}
            sizes="16px"
          />
        </div>
        <p className="min-w-0 pt-0.5 text-base leading-6 text-white">
          <span className="font-normal">Hola, </span>
          <span className="font-semibold">{firstName}</span>
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          className="flex h-7 w-[34px] shrink-0 items-center justify-center p-1 text-white opacity-90 hover:opacity-100"
          aria-label="Mostrar u ocultar saldos (demo)"
        >
          <Image
            src="/summary-figma/eye.svg"
            alt=""
            width={20}
            height={20}
            unoptimized
            className="shrink-0"
            style={{ width: '20px', height: '20px' }}
            sizes="20px"
          />
        </button>
        <Link
          href="/services"
          className="flex items-center gap-1.5 rounded-lg bg-[#0b515c] px-2 py-1 text-xs font-normal leading-5 text-white hover:bg-[#094854]"
        >
          <span className="text-sm leading-none">+</span>
          Productos
        </Link>
        <LogoutButton variant="onDark" />
      </div>
    </header>
  );
}
