import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transferir',
  description: 'Demo — transferencias (placeholder)'
};

export default function TransferPlaceholderPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-6 bg-[var(--color-surface-alt)] px-6 py-12 text-[var(--color-text-primary)]">
      <h1 className="text-xl font-semibold text-[var(--color-text-emphasis)]">Transferencias</h1>
      <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
        Esta pantalla es un placeholder de demo (RN-06 US-002). La funcionalidad de transferencias
        se implementará en una historia posterior.
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
