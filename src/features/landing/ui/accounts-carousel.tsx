import type { Account, AccountType } from '@/features/landing/types/account';

export type AccountsCarouselProps = {
  accounts: Account[];
  className?: string;
};

const currencyUsd = new Intl.NumberFormat('es-EC', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function formatCurrency(value: number): string {
  return currencyUsd.format(value);
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

function formatMaskedNumber(account: Account): string {
  const d = digitsOnly(account.number);
  const last4 = d.slice(-4) || '····';
  if (account.type === 'credit-card') {
    const first4 = d.slice(0, 4);
    return first4 ? `${first4}**** ${last4}` : `**** ${last4}`;
  }
  return `Cta. ···· *${last4}`;
}

function defaultTitle(type: AccountType): string {
  switch (type) {
    case 'saving':
      return 'Cuenta de ahorros';
    case 'checking':
      return 'Cuenta corriente';
    case 'credit-card':
      return 'Tarjeta';
  }
}

function balanceCaption(type: AccountType): string {
  return type === 'credit-card' ? 'Consumo' : 'Saldo';
}

/**
 * Marco común de tarjeta (Figma ~295×154 en arte; alto unificado con proporción ISO 7810 ID-1).
 * Ancho 295px del diseño; ratio ancho/alto = 85.60mm / 53.98mm (tarjeta física).
 */
const CARD_FRAME =
  'box-border flex w-[295px] max-w-[85vw] shrink-0 flex-col justify-between p-[var(--space-200)] text-left aspect-[85.6/53.98] rounded-[10.621px]';

function AccountCard({ account }: { account: Account }) {
  const title = account.name?.trim() || defaultTitle(account.type);
  const subtitle = formatMaskedNumber(account);
  const amount = formatCurrency(account.balance);
  const caption = balanceCaption(account.type);

  if (account.type === 'credit-card') {
    return (
      <article
        className={`${CARD_FRAME} border-[1.328px] border-[var(--color-bg-brand-hover)] text-[var(--color-text-on-brand)] shadow-[0_20px_20px_rgb(11_81_92_/_0.3)]`}
        style={{
          backgroundImage: 'linear-gradient(133deg, rgb(9, 104, 119) 8.8%, rgb(0, 130, 146) 98%)'
        }}
      >
        <header className="flex min-h-0 flex-col gap-0">
          <p className="m-0 text-[1.125rem] font-normal leading-7 text-[var(--color-text-on-brand-secondary)]">
            {title}
          </p>
          <p className="m-0 text-[length:var(--text-caption-size)] font-normal leading-[var(--text-caption-line)] text-[var(--color-text-on-brand)]">
            {subtitle}
          </p>
        </header>
        <div className="flex min-h-0 w-full flex-col gap-0">
          <p className="m-0 text-[1.375rem] font-bold leading-8">{amount}</p>
          <p className="m-0 max-w-[7.9rem] text-[length:var(--text-body-base-size)] font-normal leading-normal text-[var(--color-text-on-brand-secondary)]">
            {caption}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`${CARD_FRAME} border-[1.439px] border-[var(--color-bg-default)] bg-[var(--color-bg-secondary)] text-[var(--color-neutral-charcoal)] shadow-[0_20px_20px_rgb(11_81_92_/_0.3)]`}
    >
      <header className="flex min-h-0 flex-col gap-0">
        <p className="m-0 text-[1.125rem] font-normal leading-7 text-[var(--color-text-brand)]">
          {title}
        </p>
        <p className="m-0 text-[length:var(--text-caption-size)] font-normal leading-[var(--text-caption-line)] text-[var(--color-text-tertiary)]">
          {subtitle}
        </p>
      </header>
      <div className="flex min-h-0 w-full flex-col gap-0">
        <p className="m-0 text-[1.375rem] font-bold leading-8 text-[var(--color-neutral-very-dark)]">
          {amount}
        </p>
        <p className="m-0 max-w-[7.9rem] text-[length:var(--text-body-base-size)] font-normal leading-normal text-[var(--color-text-brand)]">
          {caption}
        </p>
      </div>
    </article>
  );
}

/**
 * Carrusel horizontal de cuentas (scroll snap). Presentacional: solo recibe `accounts` por props.
 * Montos de `credit-card` muestran consumo (`balance`), no cupo disponible.
 *
 * Ancho: rompe el `px-6` del contenedor padre (`-mx-6` + `calc(100% + 3rem)`) para ir borde a borde
 * del marco móvil (360). Padding interno en la lista para que la sombra de las tarjetas no se recorte.
 */
export function AccountsCarousel({ accounts, className }: AccountsCarouselProps) {
  if (accounts.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Resumen de cuentas"
      className={`relative -mx-6 w-[calc(100%+3rem)] max-w-none shrink-0 ${className ?? ''}`}
    >
      <ul className="m-0 flex list-none gap-[var(--space-200)] overflow-x-auto overscroll-x-contain scroll-smooth px-6 pb-6 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
        {accounts.map((account) => (
          <li key={account.id} className="snap-start snap-always py-1">
            <AccountCard account={account} />
          </li>
        ))}
      </ul>
    </section>
  );
}
