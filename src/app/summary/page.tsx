import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import type { Account } from '@/app/api/accounts/route';
import type { Movement } from '@/app/api/activity/route';
import { ACCESS_TOKEN_COOKIE } from '@/lib/auth/constants';
import { readUsernameFromDemoJwt } from '@/lib/auth/jwt-demo';
import { fetchInternalApi } from '@/lib/server/internal-fetch';
import { AccountsCarousel } from '@/components/accounts-carousel/accounts-carousel';
import { FilterChips } from '@/components/summary-home/filter-chips';
import { FrequentPaymentsRow } from '@/components/summary-home/frequent-payments-row';
import { SummaryBottomNav } from '@/components/summary-home/summary-bottom-nav';
import { SummaryTopBar } from '@/components/summary-home/summary-top-bar';
import { UpcomingPaymentsCard } from '@/components/summary-home/upcoming-payments-card';
import { RecentActivityList } from '@/components/recent-activity-list/recent-activity-list';

export const metadata: Metadata = {
  title: 'Resumen',
  description: 'Inicio autenticado (demo)'
};

const FIGMA_HOME_BG =
  'linear-gradient(180deg, rgb(11, 81, 92) 0%, rgb(0, 130, 146) 17.125%, rgb(242, 243, 247) 37.019%, rgb(242, 243, 247) 98.077%)';

async function loadAccounts(): Promise<Account[]> {
  const res = await fetchInternalApi('/api/accounts');
  if (!res.ok) return [];
  return (await res.json()) as Account[];
}

async function loadActivity(): Promise<Movement[]> {
  const res = await fetchInternalApi('/api/activity');
  if (!res.ok) return [];
  return (await res.json()) as Movement[];
}

export default async function SummaryPage() {
  const jar = await cookies();
  const token = jar.get(ACCESS_TOKEN_COOKIE)?.value;
  const sessionUser = readUsernameFromDemoJwt(token);
  const displayName = sessionUser ?? 'Usuario';

  const [accounts, movements] = await Promise.all([loadAccounts(), loadActivity()]);

  return (
    <main className="min-h-dvh pb-32 text-[#1a1a1a]" style={{ backgroundImage: FIGMA_HOME_BG }}>
      {/* Cabecera fluida con padding */}
      <div className="px-6 pt-2">
        <SummaryTopBar displayName={displayName} />
      </div>

      {/* Filtros de ancho completo (borde a borde) */}
      <div className="mt-1">
        <FilterChips />
      </div>

      {/* Carrusel de ancho completo (borde a borde) */}
      <div className="mt-4">
        <AccountsCarousel accounts={accounts} />
      </div>

      {/* Resto del contenido fluido con ancho máximo de 960px */}
      <div className="mx-auto w-full max-w-[960px] px-6">
        {/* Título de Pagos frecuentes (dentro del contenedor) */}
        <h2 className="mb-3 mt-8 text-lg leading-7 text-[#1a1a1a]">
          <span className="font-normal text-[#757575]">Pagos </span>
          <span className="font-semibold">frecuentes</span>
        </h2>
      </div>

      {/* Pagos frecuentes de ancho completo (borde a borde) */}
      <div className="mt-0">
        <FrequentPaymentsRow lastActionLabel={displayName} />
      </div>

      {/* Contenido fluido continúa */}
      <div className="mx-auto w-full max-w-[960px] px-6">
        <UpcomingPaymentsCard />
        <div className="mt-8">
          <RecentActivityList movements={movements} />
        </div>
      </div>

      <SummaryBottomNav />
    </main>
  );
}
