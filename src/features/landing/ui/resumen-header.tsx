'use client';

import { FigmaResumenIcon } from '@/features/landing/ui/figma-resumen-icon';
import Link from 'next/link';

export type ResumenHeaderProps = {
  firstName: string;
  onLogout: () => void;
};

/**
 * Encabezado alineado a Figma nodo 36:1868 (Home):
 * bloque izquierdo en inline-grid (avatar 32px + saludo con ml 44px / mt 4px),
 * gap 24px, bloque derecho inline-grid (ojo 34×28 + Productos con ml 46px).
 */
export function ResumenHeader({ firstName, onLogout }: ResumenHeaderProps) {
  return (
    <header className="mb-6 flex w-full items-center gap-6 pt-2">
      {/* Izquierda: avatar + saludo (misma celda de grid, texto desplazado como en Figma) */}
      <div className="inline-grid shrink-0 grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-[0]">
        <Link
          href="/settings"
          className="col-start-1 row-start-1 flex size-8 items-start justify-start rounded-[16px] bg-[#94e0ed] p-2 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Ir a configuración"
        >
          <span className="relative size-4 shrink-0 overflow-clip" aria-hidden>
            <FigmaResumenIcon src="/figma-resumen/icon-user-avatar.svg" width={16} height={16} />
          </span>
        </Link>
        <div className="col-start-1 row-start-1 ml-[44px] mt-1 flex flex-col justify-center self-center">
          <p className="m-0 whitespace-nowrap text-white">
            <span className="text-[16px] font-normal leading-[24px]">Hola</span>
            <span className="text-[12px] font-normal leading-[20px]">{`, `}</span>
            <span className="text-[16px] font-semibold leading-[24px]">{firstName}</span>
          </p>
        </div>
      </div>

      {/* Derecha: ojo + Productos (grid como Figma); Salir fuera de maqueta pero compacto */}
      <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-3">
        <div className="inline-grid shrink-0 grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-[0]">
          <button
            type="button"
            className="col-start-1 row-start-1 flex h-7 w-[34px] shrink-0 items-center justify-center p-1 text-white"
            aria-label="Ocultar o mostrar saldos"
          >
            <FigmaResumenIcon src="/figma-resumen/icon-eye.svg" width={20} height={20} />
          </button>
          <span className="col-start-1 row-start-1 ml-[46px] mt-0 flex shrink-0 items-center gap-1.5 rounded-[8px] bg-[#0b515c] px-2 py-1">
            <span className="flex size-3 shrink-0 items-center justify-center [-webkit-transform:rotate(180deg)_scaleY(-1)] [transform:rotate(180deg)_scaleY(-1)]">
              <FigmaResumenIcon src="/figma-resumen/icon-plus.svg" width={12} height={12} />
            </span>
            <span className="text-[12px] font-normal leading-5 text-white">Productos</span>
          </span>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="shrink-0 text-[11px] font-medium leading-tight text-white/90 underline decoration-white/50 underline-offset-2"
        >
          Salir
        </button>
      </div>
    </header>
  );
}
