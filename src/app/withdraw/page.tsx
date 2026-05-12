import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retirar',
  description: 'Demo — retiros (placeholder)'
};

export default function WithdrawPlaceholderPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-6 bg-[var(--color-surface-alt)] px-6 py-12 text-[var(--color-text-primary)]">
      <h1 className="text-xl font-semibold text-[var(--color-text-emphasis)]">Retirar efectivo</h1>
      <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
        Placeholder de demo. El flujo de retiros se definirá en una historia posterior.
      </p>
      <Link
        href="/summary"
        className="inline-flex w-fit rounded-sm bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-primary-hover)]"
      >
        Volver al resumen
      </Link>
    </main>
  );
}
