import Link from 'next/link';
import { cookies, headers } from 'next/headers';
import { AccountsCarousel } from '@/features/landing/ui/accounts-carousel';
import { DEMO_ACCESS_TOKEN_COOKIE, parseUsernameFromDemoJwt } from '@/lib/demo-auth';
import type { Movement } from '@/shared/contracts/activity';
import type { Account } from '@/shared/contracts/accounts';

const MONTHS_ES = [
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

/** Fecha en lista de actividad: día + mes, como maqueta Home (Figma 1:1971). */
function formatMovementDayMonth(value: string) {
  const d = new Date(value);
  const day = d.getUTCDate();
  const month = MONTHS_ES[d.getUTCMonth()] ?? '';
  return { day: String(day).padStart(2, '0'), month };
}

function formatAmountSigned(value: number) {
  // Figma muestra importes con $ y punto decimal: $47.00 / -$91.02
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return `${value < 0 ? '-' : ''}$${formatted}`;
}

async function getBaseUrl() {
  const requestHeaders = await headers();
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host');
  const protocol = requestHeaders.get('x-forwarded-proto') ?? 'http';
  return host ? `${protocol}://${host}` : 'http://localhost:3000';
}

async function getLandingData() {
  const baseUrl = await getBaseUrl();
  const [accountsRes, activityRes] = await Promise.all([
    fetch(`${baseUrl}/api/accounts`, { cache: 'no-store' }),
    fetch(`${baseUrl}/api/activity`, { cache: 'no-store' })
  ]);

  if (!accountsRes.ok || !activityRes.ok) {
    throw new Error('No fue posible cargar el resumen de la landing.');
  }

  const [accounts, activity] = (await Promise.all([accountsRes.json(), activityRes.json()])) as [
    Account[],
    Movement[]
  ];

  return { accounts, activity };
}

async function getUsername() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(DEMO_ACCESS_TOKEN_COOKIE)?.value;
  const username = parseUsernameFromDemoJwt(accessToken);
  return username ?? 'usuario';
}

/** Ítems “Pagos frecuentes” y etiquetas según frame Home (Figma 1:1971). */
const FREQUENT_PAYMENTS = [
  { label: 'Agua casa', icon: 'droplet' },
  { label: 'Pago luz', icon: 'lightbulb' },
  { label: 'Jannet Ruiz', icon: 'user' },
  { label: 'Centro Educativo', icon: 'school' },
  { label: 'Cristian Ramos', icon: 'user' }
] as const;

function FrequentIcon({ name }: { name: (typeof FREQUENT_PAYMENTS)[number]['icon'] }) {
  const cls = 'size-[25px] text-(--color-text-brand)';
  switch (name) {
    case 'droplet':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 2.5c-3 4.5-6 8.2-6 12a6 6 0 1012 0c0-3.8-3-8.5-6-12z"
            stroke="currentColor"
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'lightbulb':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M9 18h6M10 22h4M8.5 13.5a4.5 4.5 0 119 0c0 1.5-.5 2.5-1.2 3.5H9.7c-.7-1-1.2-2-1.2-3.5z"
            stroke="currentColor"
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        </svg>
      );
    case 'user':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM5 20a7 7 0 0114 0"
            stroke="currentColor"
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        </svg>
      );
    case 'school':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 10l8-4 8 4-8 4-8-4zM6 12v5l6 3 6-3v-5M6 12l6 3 6-3"
            stroke="currentColor"
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default async function HomePage() {
  const [{ accounts, activity }, username] = await Promise.all([getLandingData(), getUsername()]);

  return (
    <div className="relative min-h-full w-full bg-[#f2f3f7] px-6 pb-28">
      <main id="main-content">
        {/* Header + gradiente + pestañas + carrusel (orden Figma 1:1971) */}
        <div className="rounded-b-3xl bg-gradient-to-b from-[#0b515c] from-0% via-[#008292] via-50% to-[#f2f3f7] to-100% px-6 pb-4 pt-11 text-white">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-3">
              <Link
                href="/settings"
                className="grid size-[32px] shrink-0 place-items-center rounded-[16px] bg-[#94e0ed] text-[#0b515c]"
                aria-label="Ir a configuración de perfil"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM5 20a7 7 0 0114 0"
                    stroke="currentColor"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
              <p className="truncate text-base leading-6 text-white">
                <span className="font-normal">Hola</span>
                <span className="text-xs leading-5">, </span>
                <span className="font-semibold capitalize">{username}</span>
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                className="grid h-[28px] w-[34px] place-items-center rounded-[14px] text-white"
                aria-label="Mostrar u ocultar saldos"
              >
                <svg className="size-[20px]" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
                    stroke="currentColor"
                    strokeWidth={1.4}
                  />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={1.4} />
                </svg>
              </button>
              <div className="flex items-center gap-1.5 rounded-[8px] bg-[#0b515c] px-2 py-[4px] text-[12px] leading-[20px] text-white">
                <span className="text-[12px] leading-none" aria-hidden>
                  +
                </span>
                <span className="leading-[20px]">Productos</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-[10px] overflow-x-auto pb-[3px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="flex h-6 shrink-0 items-center justify-center rounded-[12px] border border-[#d0f0f6] bg-[#f2f3f7] px-[12px] text-center text-[12px] font-semibold leading-[20px] text-(--color-text-brand)">
              Todos
            </span>
            {(['Cuentas', 'Tarjetas', 'Inversiones', 'Préstamos'] as const).map((label) => (
              <button
                key={label}
                type="button"
                className="flex h-6 shrink-0 items-center justify-center rounded-[12px] border border-white px-[12px] text-[12px] font-semibold leading-[20px] text-white"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <AccountsCarousel accounts={accounts} variant="figma" />
          </div>
        </div>

        <div className="space-y-6 pt-4">
          {/* Pagos frecuentes */}
          <section className="space-y-3">
            <h2 className="text-[18px] leading-[28px] text-[#757575]">
              Pagos <span className="font-semibold text-[#1a1a1a]">frecuentes</span>
            </h2>
            <div className="flex gap-[16px] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {FREQUENT_PAYMENTS.map((item) => (
                <Link
                  key={item.label}
                  href="/transfers?feature=payments"
                  className="flex w-[56px] shrink-0 flex-col items-center gap-[3px] text-center"
                >
                  <span className="grid size-[46px] shrink-0 place-items-center rounded-[23px] border border-[#f2f3f7] bg-white">
                    <FrequentIcon name={item.icon} />
                  </span>
                  <span className="w-full text-[10px] leading-[18px] text-[#1a1a1a]">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* 3 pagos próximos */}
          <section>
            <Link
              href="/transfers?feature=upcoming-payments"
              className="flex h-[68px] items-center justify-between gap-3 rounded-[12px] border border-[#f2f3f7] bg-white px-[12px] py-[16px]"
            >
              <div className="flex items-center gap-4">
                <span
                  className="grid size-[32px] place-items-center rounded-full bg-[#d1e4f0] text-[#0067ae]"
                  aria-hidden
                >
                  <svg className="size-[22px]" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="6"
                      width="18"
                      height="12"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth={1.4}
                    />
                    <path d="M3 10h18" stroke="currentColor" strokeWidth={1.4} />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <p className="text-[12px] leading-[20px] text-[#1a1a1a]">3 pagos próximos</p>
                  <p className="font-semibold text-[12px] leading-[20px] text-[#0067ae]">
                    Ver pagos
                  </p>
                </div>
              </div>
              <p className="text-right text-[12px] leading-[20px] text-[#1a1a1a]">$47.00</p>
            </Link>
          </section>

          {/* Actividad reciente */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] leading-[28px] text-[#757575]">
                Actividad <span className="font-semibold text-[#1a1a1a]">reciente</span>
              </h2>
              <button
                type="button"
                className="grid size-[32px] place-items-center rounded-[16px] bg-white"
                aria-label="Calendario"
              >
                <svg
                  className="size-[16px] text-[#1a1a1a]"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M8 6V4m8 2V4M5 10h14M5 8a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V8z"
                    stroke="currentColor"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {activity.length === 0 ? (
              <p className="rounded-lg bg-white px-4 py-3 text-xs text-text-secondary">
                Aún no hay movimientos recientes para mostrar.
              </p>
            ) : (
              <ul className="flex flex-col gap-[4px]">
                {activity.slice(0, 3).map((movement) => {
                  const { day, month } = formatMovementDayMonth(movement.date);
                  return (
                    <li
                      key={`${movement.accountNumber}-${movement.date}-${movement.description}`}
                      className="flex h-[56px] items-center justify-between gap-2 rounded-[8px] border border-[#f2f3f7] bg-white px-[16px] py-[12px]"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-[16px]">
                        <div className="flex shrink-0 flex-col items-center justify-center leading-[0] text-center whitespace-nowrap">
                          <span className="mb-[-4px] text-[16px] font-semibold leading-[24px] text-(--color-text-brand)">
                            {day}
                          </span>
                          <span className="text-[12px] font-normal leading-[20px] text-[#757575]">
                            {month}
                          </span>
                        </div>
                        <p className="min-w-0 flex-1 text-[12px] leading-[20px] text-[#1a1a1a]">
                          {movement.description}
                        </p>
                      </div>
                      <p className="w-[80px] shrink-0 text-right text-[12px] font-semibold leading-[20px] text-[#474747]">
                        {formatAmountSigned(movement.amount)}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </main>

      {/* Barra inferior (Figma 1:1971) */}
      <nav
        className="fixed bottom-[16px] left-1/2 z-10 -translate-x-1/2 flex h-[64px] w-[330px] items-end justify-between gap-0 rounded-[24px] border border-white bg-[rgba(255,255,255,0.05)] px-[14px] pb-[8px] pt-[10px] backdrop-blur-sm"
        aria-label="Navegación principal"
      >
        <Link
          href="/"
          className="relative flex h-[68px] w-[60px] flex-col items-center justify-center gap-0.5 rounded-[24px] bg-[#e5ebee]"
        >
          <svg
            className="size-[24px] text-(--color-text-brand)"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z"
              stroke="currentColor"
              strokeWidth={1.4}
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[10px] font-semibold leading-[20px] text-(--color-text-brand)">
            Inicio
          </span>
        </Link>

        <Link
          href="/transfers"
          className="flex h-[68px] w-[60px] flex-col items-center justify-center gap-0.5"
        >
          <svg className="size-[24px] text-[#757575]" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M7 8l-4 4 4 4M17 8l4 4-4 4M3 12h6.5M14.5 12H21"
              stroke="currentColor"
              strokeWidth={1.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[10px] font-normal leading-[20px] text-[#757575]">Transferir</span>
        </Link>

        <Link
          href="/transfers?feature=withdraw"
          className="flex h-[68px] w-[60px] flex-col items-center justify-center gap-0.5"
        >
          <svg className="size-[24px] text-[#757575]" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 3v18M7 14h10M9 10h6"
              stroke="currentColor"
              strokeWidth={1.2}
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[10px] font-normal leading-[20px] text-[#757575]">Retirar</span>
        </Link>

        <Link
          href="/transfers?feature=payments"
          className="flex h-[68px] w-[60px] flex-col items-center justify-center gap-0.5"
        >
          <svg className="size-[24px] text-[#757575]" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M9 18h6M10 22h4M8.5 13.5a4.5 4.5 0 119 0c0 1.5-.5 2.5-1.2 3.5H9.7c-.7-1-1.2-2-1.2-3.5z"
              stroke="currentColor"
              strokeWidth={1.2}
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[10px] font-normal leading-[20px] text-[#757575]">Pagos</span>
        </Link>

        <Link
          href="/settings"
          className="flex h-[68px] w-[60px] flex-col items-center justify-center gap-0.5"
        >
          <svg className="size-[24px] text-[#757575]" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 6h4v4H4V6zm6 0h4v4h-4V6zm6 0h4v4h-4V6zM4 14h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"
              fill="currentColor"
            />
          </svg>
          <span className="text-[10px] font-normal leading-[20px] text-[#757575]">Ajustes</span>
        </Link>
      </nav>
    </div>
  );
}
