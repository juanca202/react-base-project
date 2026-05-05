import type { Account } from '@/shared/contracts/accounts';

type AccountsCarouselProps = {
  accounts: Account[];
  /** `figma`: sin título “Tus cuentas”; tarjetas según maqueta Home (nodo 1:1971). */
  variant?: 'default' | 'figma';
};

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 2
});

function formatAccountLine(type: Account['type'], number: string) {
  const last4 = number.slice(-4);
  if (type === 'credit-card') {
    return `${number.slice(0, 4)}**** ${last4}`;
  }
  if (type === 'saving') {
    return `Cta. ahorros**** *${last4}`;
  }
  return `Cta. corriente**** *${last4}`;
}

function getAmountLabel(accountType: Account['type']) {
  if (accountType === 'credit-card') return 'Total a pagar';
  return 'Saldo';
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      className={['size-6 shrink-0', className].filter(Boolean).join(' ')}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M8.59 13.34l4.95-4.95M15.41 5.66h4v4M5 19l4.24-4.24"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AccountsCarousel({ accounts, variant = 'default' }: AccountsCarouselProps) {
  if (accounts.length === 0) {
    return (
      <section aria-label="Resumen de cuentas" className="rounded-2xl bg-bg-secondary p-4">
        <p className="text-sm text-text-secondary">No hay cuentas para mostrar.</p>
      </section>
    );
  }

  const carousel = (
    <div className="flex min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {accounts.map((account) => {
        const title = account.name ?? 'Cuenta';
        const subtitle = formatAccountLine(account.type, account.number);
        const amount = currencyFormatter.format(account.balance);
        const caption = getAmountLabel(account.type);

        const cardBasis =
          'shrink-0 snap-start flex-[0_0_88%] sm:flex-[0_0_72%] md:flex-[0_0_52%] lg:flex-[0_0_42%]';

        if (account.type === 'credit-card') {
          return (
            <article
              key={account.id}
              className={`${cardBasis} max-w-full rounded-[10.6px] border border-[#757575] bg-gradient-to-br from-[#1a1a1a] to-[#333333] p-4 text-white shadow-[0_20px_40px_rgba(11,81,92,0.3)]`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-lg font-normal leading-7 text-white">{title}</p>
                <ShareIcon className="shrink-0 text-[#e2e2e2]" />
              </div>
              <p className="mt-1 text-xs leading-5 text-[#e2e2e2]">{subtitle}</p>
              <div className="mt-6 space-y-1">
                <p className="text-[22px] font-bold leading-8 text-white">{amount}</p>
                <p className="text-sm leading-normal text-[#e2e2e2]">{caption}</p>
              </div>
            </article>
          );
        }

        return (
          <article
            key={account.id}
            className={`${cardBasis} max-w-full rounded-[11.5px] border-[1.4px] border-white bg-[#ebf3f9] p-4 shadow-[0_20px_40px_rgba(11,81,92,0.3)]`}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-lg font-normal leading-7 text-text-brand">{title}</p>
              <ShareIcon className="shrink-0 text-text-brand" />
            </div>
            <p className="mt-1 text-xs leading-5 text-[#757575]">{subtitle}</p>
            <div className="mt-6 space-y-1">
              <p className="text-[22px] font-bold leading-8 text-[#1a1a1a]">{amount}</p>
              <p className="text-sm leading-normal text-text-brand">{caption}</p>
            </div>
          </article>
        );
      })}
    </div>
  );

  if (variant === 'figma') {
    return (
      <div className="w-full" aria-label="Resumen de cuentas">
        {carousel}
      </div>
    );
  }

  return (
    <section aria-label="Resumen de cuentas" className="space-y-3">
      <header>
        <h2 className="text-lg font-semibold text-text-default">Tus cuentas</h2>
      </header>
      {carousel}
    </section>
  );
}
