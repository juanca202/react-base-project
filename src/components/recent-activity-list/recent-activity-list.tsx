import Image from 'next/image';
import type { Movement } from '@/app/api/activity/route';

export type RecentActivityListProps = {
  movements: Movement[];
};

const MONTHS = [
  'ENE',
  'FEB',
  'MAR',
  'ABR',
  'MAY',
  'JUN',
  'JUL',
  'AGO',
  'SEP',
  'OCT',
  'NOV',
  'DIC'
] as const;

const money = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function dateParts(iso: string): { day: string; month: string } {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return { day: '—', month: '—' };
  }
  return {
    day: String(d.getUTCDate()).padStart(2, '0'),
    month: MONTHS[d.getUTCMonth()] ?? '—'
  };
}

/**
 * Lista de movimientos recientes (presentacional). Alineado a GET /api/activity.
 */
export function RecentActivityList({ movements }: RecentActivityListProps) {
  if (movements.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-[var(--color-border)] bg-white px-4 py-6 text-center text-sm text-[var(--color-text-secondary)] shadow-sm">
        No hay movimientos recientes.
      </p>
    );
  }

  return (
    <section aria-labelledby="recent-activity-heading">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2
          id="recent-activity-heading"
          className="text-lg leading-7 text-[var(--color-text-primary)]"
        >
          <span className="font-normal text-[#757575]">Actividad </span>
          <span className="font-semibold text-[var(--color-text-emphasis)]">reciente</span>
        </h2>
        <button
          type="button"
          className="flex size-8 shrink-0 items-start justify-center rounded-2xl bg-white p-2"
          aria-label="Calendario de movimientos (demo)"
        >
          <Image
            src="/summary-figma/calendar.svg"
            alt=""
            width={16}
            height={16}
            unoptimized
            className="shrink-0 object-contain object-center"
            style={{ width: '16px', height: '16px' }}
            sizes="16px"
          />
        </button>
      </div>
      <ul className="flex flex-col gap-1">
        {movements.map((m, index) => {
          const { day, month } = dateParts(m.date);
          const formatted = money.format(m.amount);
          return (
            <li
              key={`${m.date}-${m.description}-${m.amount}-${index}`}
              className="flex h-14 items-center justify-between gap-4 rounded-lg border-b border-[#f2f3f7] bg-white px-4 py-3 first:rounded-t-lg last:rounded-b-lg last:border-b-0"
            >
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="flex w-10 shrink-0 flex-col items-center text-center leading-none">
                  <span className="text-base font-semibold leading-6 text-[#008292]">{day}</span>
                  <span className="text-xs font-normal leading-5 text-[#757575]">{month}</span>
                </div>
                <p className="min-w-0 truncate text-xs font-normal leading-5 text-[#1a1a1a]">
                  {m.description}
                </p>
              </div>
              <p className="shrink-0 text-right text-xs font-semibold leading-5 text-[#474747] tabular-nums">
                {formatted}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
