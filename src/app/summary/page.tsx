import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { ACCESS_TOKEN_COOKIE } from '@/lib/auth/constants';
import { readUsernameFromDemoJwt } from '@/lib/auth/jwt-demo';
import { LogoutButton } from './logout-button';

export const metadata: Metadata = {
  title: 'Resumen',
  description: 'Inicio autenticado (demo)'
};

export default async function SummaryPage() {
  const jar = await cookies();
  const token = jar.get(ACCESS_TOKEN_COOKIE)?.value;
  const username = readUsernameFromDemoJwt(token) ?? 'Usuario';

  return (
    <main className="min-h-dvh bg-[var(--color-surface-alt)] text-[var(--color-text-primary)]">
      <header className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
            Resumen
          </p>
          <p className="text-lg font-semibold text-[var(--color-text-emphasis)]">
            Hola, {username}
          </p>
        </div>
        <LogoutButton />
      </header>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
          <h2 className="mb-2 text-base font-semibold text-[var(--color-text-emphasis)]">
            Ruta protegida de referencia
          </h2>
          <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
            Esta vista bajo{' '}
            <code className="rounded bg-[var(--color-surface-alt)] px-1">/summary</code> solo es
            accesible con sesión válida. Sin cookies de sesión, el proxy de Next.js te redirige a{' '}
            <code className="rounded bg-[var(--color-surface-alt)] px-1">/login</code>.
          </p>
        </section>
      </div>
    </main>
  );
}
