'use client';

import type { Account } from '@/features/landing/types/account';
import type { AccountCategoryTab } from '@/features/landing/types/account-category';
import type { Movement } from '@/features/landing/types/movement';
import { firstNameFromUsername } from '@/features/landing/lib/display-name';
import { filterAccountsByTab } from '@/features/landing/lib/filter-accounts-by-tab';
import { AccountCategoryTabs } from '@/features/landing/ui/account-category-tabs';
import { AccountsCarousel } from '@/features/landing/ui/accounts-carousel';
import { FrequentPaymentsRow } from '@/features/landing/ui/frequent-payments-row';
import { RecentActivity } from '@/features/landing/ui/recent-activity';
import { ResumenBottomNav } from '@/features/landing/ui/resumen-bottom-nav';
import { ResumenHeader } from '@/features/landing/ui/resumen-header';
import { UpcomingPaymentsBanner } from '@/features/landing/ui/upcoming-payments-banner';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type LoadResult =
  | { kind: 'unauthorized' }
  | { kind: 'error'; message: string }
  | { kind: 'success'; username: string; accounts: Account[]; movements: Movement[] };

async function loadLandingPage(): Promise<LoadResult> {
  const [sRes, aRes, mRes] = await Promise.all([
    fetch('/api/session', { credentials: 'same-origin' }),
    fetch('/api/accounts', { credentials: 'same-origin' }),
    fetch('/api/activity', { credentials: 'same-origin' })
  ]);

  if (sRes.status === 401 || aRes.status === 401 || mRes.status === 401) {
    return { kind: 'unauthorized' };
  }

  if (!sRes.ok || !aRes.ok || !mRes.ok) {
    return { kind: 'error', message: 'No se pudo cargar el resumen. Intenta de nuevo.' };
  }

  const session = (await sRes.json()) as { username: string };
  const accounts = (await aRes.json()) as Account[];
  const movements = (await mRes.json()) as Movement[];

  return {
    kind: 'success',
    username: session.username,
    accounts,
    movements
  };
}

const HOME_BG =
  'linear-gradient(180deg, rgb(11, 81, 92) 0%, rgb(0, 130, 146) 17.125%, rgb(242, 243, 247) 37.019%, rgb(242, 243, 247) 98.077%)';

export default function ResumenPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('Usuario');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accountTab, setAccountTab] = useState<AccountCategoryTab>('all');

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const result = await loadLandingPage();
      if (cancelled) return;

      if (result.kind === 'unauthorized') {
        router.replace('/iniciar-sesion');
        setLoading(false);
        return;
      }

      if (result.kind === 'error') {
        setError(result.message);
        setAccounts([]);
        setMovements([]);
        setLoading(false);
        return;
      }

      setFirstName(firstNameFromUsername(result.username));
      setAccounts(result.accounts);
      setMovements(result.movements);
      setError(null);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleRetry() {
    setLoading(true);
    setError(null);
    const result = await loadLandingPage();

    if (result.kind === 'unauthorized') {
      router.replace('/iniciar-sesion');
      setLoading(false);
      return;
    }

    if (result.kind === 'error') {
      setError(result.message);
      setAccounts([]);
      setMovements([]);
      setLoading(false);
      return;
    }

    setFirstName(firstNameFromUsername(result.username));
    setAccounts(result.accounts);
    setMovements(result.movements);
    setError(null);
    setLoading(false);
  }

  async function handleLogout() {
    await fetch('/api/mock-logout', { method: 'POST' });
    router.replace('/iniciar-sesion');
  }

  const filteredAccounts = filterAccountsByTab(accounts, accountTab);

  return (
    <main className="relative min-h-screen w-full pb-28" style={{ backgroundImage: HOME_BG }}>
      <div className="relative z-[1] mx-auto w-full max-w-[360px] px-6 pb-8 pt-3">
        {error && (
          <div
            className="mb-6 rounded-[var(--radius-200)] border border-[var(--color-border-default)] bg-[var(--color-bg-input-error)] px-[var(--space-200)] py-[var(--space-150)] text-[length:var(--text-body-base-size)] text-[var(--color-text-danger)]"
            role="alert"
          >
            <p className="m-0 mb-3">{error}</p>
            <button
              type="button"
              onClick={() => void handleRetry()}
              className="rounded-[var(--radius-100)] bg-[var(--color-bg-brand)] px-4 py-2 text-[length:var(--text-caption-size)] font-medium text-[var(--color-text-on-brand)]"
            >
              Reintentar
            </button>
          </div>
        )}

        {loading && (
          <p className="m-0 py-10 text-center text-[length:var(--text-body-base-size)] text-[var(--color-text-secondary)]">
            Cargando resumen…
          </p>
        )}

        {!loading && !error && (
          <>
            <ResumenHeader firstName={firstName} onLogout={handleLogout} />

            <AccountCategoryTabs active={accountTab} onChange={setAccountTab} />

            <AccountsCarousel accounts={filteredAccounts} className="mb-4" />

            {filteredAccounts.length === 0 && (
              <p className="mb-6 text-center text-[length:var(--text-caption-size)] font-normal leading-5 text-white">
                No hay productos en esta categoría.
              </p>
            )}

            <div className="space-y-6 text-[var(--color-text-default)]">
              <FrequentPaymentsRow />
              <UpcomingPaymentsBanner />
              <RecentActivity movements={movements} />
            </div>
          </>
        )}
      </div>

      {!loading && !error && <ResumenBottomNav />}
    </main>
  );
}
