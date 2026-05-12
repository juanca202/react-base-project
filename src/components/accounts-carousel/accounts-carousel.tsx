import Image from 'next/image';
import type { Account, AccountType } from '@/app/api/accounts/route';

/** Maqueta: https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=36-1699 */

export type AccountsCarouselProps = {
  accounts: Account[];
};

/** Moneda con prefijo tipo maqueta (MXN → $) — Figma ref. nodo 36:1699 */
const money = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function accountSubtitleLine(type: AccountType, number: string): string {
  const digits = number.replace(/\D/g, '');
  const tail = digits.slice(-3);
  if (type === 'saving') return `Cta. ahorros**** *${tail}`;
  if (type === 'checking') return `Cta. corriente**** *${tail}`;
  return '';
}

function cardMaskedPan(number: string): string {
  const digits = number.replace(/\D/g, '');
  if (digits.length >= 8) {
    return `${digits.slice(0, 4)}**** ${digits.slice(-4)}`;
  }
  return number;
}

function displayTitle(account: Account): string {
  if (account.name?.trim()) return account.name.trim();
  if (account.type === 'credit-card') return 'Tarjeta';
  if (account.type === 'saving') return 'Ahorros';
  return 'Corriente';
}

function amountLabel(type: AccountType): string {
  if (type === 'credit-card') return 'Consumo';
  return 'Saldo';
}

/**
 * Carrusel horizontal de cuentas (scroll snap), fiel a maqueta Figma
 * Pantallas taller SDD — nodo 36:1699 (tabs + fila de tarjetas).
 * Presentacional: solo props; activos en /public/accounts-carousel/.
 */
export function AccountsCarousel({ accounts }: AccountsCarouselProps) {
  if (accounts.length === 0) {
    return (
      <p className="rounded-[12px] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-6 text-center text-sm text-[var(--color-text-secondary)]">
        No hay cuentas para mostrar.
      </p>
    );
  }

  return (
    <section aria-label="Cuentas" className="w-full">
      <h2 className="sr-only">Cuentas</h2>
      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 pt-0.5 [scrollbar-color:var(--color-border)_transparent] [scrollbar-width:thin]"
        role="list"
      >
        {accounts.map((account) =>
          account.type === 'credit-card' ? (
            <CreditCardSlide key={account.id} account={account} />
          ) : (
            <LightAccountSlide key={account.id} account={account} />
          )
        )}
      </div>
    </section>
  );
}

function LightAccountSlide({ account }: { account: Account }) {
  const subtitle = accountSubtitleLine(account.type, account.number);

  return (
    <article
      role="listitem"
      className="flex w-[min(295px,calc(100vw-3rem))] shrink-0 snap-center snap-always flex-col gap-6 rounded-[11.5px] border-[1.5px] border-white bg-[#ebf3f9] p-4"
    >
      <div className="flex w-full flex-col gap-0">
        <div className="flex items-start justify-between gap-3">
          <p className="text-lg font-normal leading-7 text-[#008292]">{displayTitle(account)}</p>
          <button
            type="button"
            className="shrink-0 rounded-md p-0.5 text-[#008292] hover:bg-black/5 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            aria-label="Acciones de cuenta"
          >
            <Image
              src="/accounts-carousel/icon-share-nodes.svg"
              alt=""
              width={23.024}
              height={23.024}
              unoptimized
              className="shrink-0 object-contain object-center"
              style={{ width: '23.024px', height: '23.024px' }}
              sizes="23px"
            />
          </button>
        </div>
        <p className="mt-1 text-xs font-normal leading-5 text-[#757575]">{subtitle}</p>
      </div>
      <div className="flex w-full flex-col items-start leading-none">
        <p className="text-[22px] font-bold leading-8 text-[#1a1a1a]">
          {money.format(account.balance)}
        </p>
        <p className="mt-0 text-sm font-normal leading-normal text-[#008292]">
          {amountLabel(account.type)}
        </p>
      </div>
    </article>
  );
}

function CreditCardSlide({ account }: { account: Account }) {
  return (
    <article
      role="listitem"
      className="relative flex h-[154px] w-[min(295px,calc(100vw-3rem))] shrink-0 snap-center snap-always flex-col gap-6 overflow-hidden rounded-[10.621px] border-[1.328px] border-[#757575] p-[15.931px]"
    >
      <Image
        src="/accounts-carousel/card-overview-bg.png"
        alt=""
        fill
        className="object-cover object-bottom"
        sizes="295px"
        unoptimized
        aria-hidden
      />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex w-full flex-col gap-0">
          <div className="flex items-start justify-between gap-3">
            <p className="text-lg font-normal leading-7 text-white">{displayTitle(account)}</p>
            <Image
              src="/accounts-carousel/card-brand.svg"
              alt=""
              width={39.964}
              height={12.943}
              unoptimized
              className="shrink-0 object-contain object-left object-top"
              style={{ width: '39.964px', height: '12.943px' }}
              sizes="40px"
            />
          </div>
          <p className="text-xs font-normal leading-5 text-[#e2e2e2]">
            {cardMaskedPan(account.number)}
          </p>
        </div>
        <div className="flex w-full flex-col items-start">
          <p className="text-[22px] font-bold leading-8 text-white">
            {money.format(account.balance)}
          </p>
          <p className="mt-0 text-sm font-normal leading-normal text-[#e2e2e2]">
            {amountLabel(account.type)}
          </p>
          <p className="mt-1 max-w-[14rem] text-[11px] leading-snug text-white/75">
            Importe de consumo acumulado; no incluye cupo disponible.
          </p>
        </div>
      </div>
    </article>
  );
}
