import Link from 'next/link';

const accounts = [
  { name: 'Cuenta Nómina', number: '**** 1284', balance: '$18,450.32' },
  { name: 'Cuenta Ahorro', number: '**** 9021', balance: '$72,010.00' }
];

const latestMovements = [
  { description: 'Supermercado Central', date: 'Hoy, 10:15', amount: '-$1,248.90' },
  { description: 'Transferencia recibida', date: 'Ayer, 17:42', amount: '+$5,200.00' },
  { description: 'Pago de internet', date: 'Ayer, 09:08', amount: '-$899.00' }
];

const quickActions = [
  { href: '/transfers', label: 'Transferencias', helper: 'Envío inmediato', icon: '↗' },
  { href: '/services-payment', label: 'Servicios', helper: 'Luz, agua, internet', icon: '⚡' },
  { href: '/qr-payments', label: 'Pagos QR', helper: 'Escanea y paga', icon: '▣' }
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-5xl flex-1 flex-col gap-6 p-6 md:gap-8 md:p-8">
      <section aria-labelledby="accounts-title" className="space-y-4">
        <h2 id="accounts-title" className="text-xl font-semibold text-color-text-default">
          Mis cuentas
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {accounts.map((account) => (
            <article
              key={account.number}
              className="rounded-2xl bg-bg-secondary p-5 shadow-[var(--shadow-100)]"
            >
              <p className="text-sm text-color-text-secondary">{account.name}</p>
              <p className="mt-1 text-sm text-color-text-tertiary">{account.number}</p>
              <p className="mt-4 text-2xl font-semibold text-color-text-default">
                {account.balance}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="movements-title" className="space-y-4">
        <h2 id="movements-title" className="text-xl font-semibold text-color-text-default">
          Últimos movimientos
        </h2>
        <ul className="rounded-2xl bg-bg-secondary shadow-[var(--shadow-100)]">
          {latestMovements.map((movement) => (
            <li
              key={movement.description}
              className="flex items-center justify-between gap-4 px-5 py-4 not-last:border-b not-last:border-gray-200"
            >
              <div>
                <p className="font-medium text-color-text-default">{movement.description}</p>
                <p className="text-sm text-color-text-secondary">{movement.date}</p>
              </div>
              <p className="font-semibold text-color-text-default">{movement.amount}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="actions-title" className="space-y-4">
        <h2 id="actions-title" className="text-xl font-semibold text-color-text-default">
          Atajos
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="min-w-44 rounded-xl bg-bg-brand-secondary px-4 py-3 text-color-text-brand transition-colors hover:bg-bg-default-hover"
            >
              <span className="flex items-center gap-2 text-sm font-semibold">
                <span aria-hidden>{action.icon}</span>
                {action.label}
              </span>
              <span className="mt-1 block text-xs text-color-text-brand-secondary">
                {action.helper}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
