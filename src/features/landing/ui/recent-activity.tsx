import { transactionCalendarParts } from '@/features/landing/lib/transaction-calendar-parts';
import type { Movement } from '@/features/landing/types/movement';
import { FigmaResumenIcon } from '@/features/landing/ui/figma-resumen-icon';

export type RecentActivityProps = {
  movements: Movement[];
};

/** Importes como en maqueta (-$91.02), peso semibold gris secundario. */
function formatMovementAmountFigmatic(amount: number): string {
  const abs = Math.abs(amount);
  const num = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(abs);
  if (amount < 0) return `-$${num}`;
  if (amount > 0) return `+$${num}`;
  return `$${num}`;
}

/**
 * Lista «Actividad reciente» (Figma 36:1699). Botón calendario 32×32, glifo 16×16, p-8.
 */
export function RecentActivity({ movements }: RecentActivityProps) {
  if (movements.length === 0) {
    return (
      <p className="m-0 text-[length:var(--text-caption-size)] leading-5 text-[var(--color-text-tertiary)]">
        No hay movimientos recientes para mostrar.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="m-0 text-[0px] leading-[28px]">
          <span className="text-[18px] font-normal leading-[28px] text-[#757575]">Actividad </span>
          <span className="text-[18px] font-semibold leading-[28px] text-[#1a1a1a]">reciente</span>
        </h2>
        <button
          type="button"
          className="flex size-8 items-center justify-center rounded-[16px] bg-white p-2 shadow-[var(--shadow-100)]"
          aria-label="Calendario de movimientos"
        >
          <FigmaResumenIcon src="/figma-resumen/icon-calendar.svg" width={16} height={16} />
        </button>
      </div>

      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        {movements.map((m, index) => {
          const { day, month } = transactionCalendarParts(m.date);
          return (
            <li
              key={`${m.date}-${m.description}-${index}`}
              className="flex h-14 items-center justify-between rounded-lg bg-white px-4 py-3 shadow-[0_1px_0_rgb(242_243_247_/1)]"
            >
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="flex w-10 shrink-0 flex-col items-center justify-center leading-none">
                  <span className="text-[16px] font-semibold leading-6 text-[var(--color-text-brand)]">
                    {day}
                  </span>
                  <span className="text-[length:var(--text-caption-size)] font-normal leading-5 text-[#757575]">
                    {month}
                  </span>
                </div>
                <p className="m-0 min-w-0 flex-1 truncate text-[length:var(--text-caption-size)] font-normal leading-5 text-[#1a1a1a]">
                  {m.description}
                </p>
              </div>
              <p className="m-0 w-[72px] shrink-0 text-right text-[length:var(--text-caption-size)] font-semibold tabular-nums leading-5 text-[#474747]">
                {formatMovementAmountFigmatic(m.amount)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
