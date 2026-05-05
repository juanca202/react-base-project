import Link from 'next/link';
import { headers } from 'next/headers';
import type { Settings } from '@/shared/contracts/settings';

async function getBaseUrl() {
  const requestHeaders = await headers();
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host');
  const protocol = requestHeaders.get('x-forwarded-proto') ?? 'http';
  return host ? `${protocol}://${host}` : 'http://localhost:3000';
}

async function getSettings(): Promise<Settings> {
  const baseUrl = await getBaseUrl();
  const requestHeaders = await headers();
  const cookieHeader = requestHeaders.get('cookie') ?? '';
  const res = await fetch(`${baseUrl}/api/settings`, {
    cache: 'no-store',
    headers: {
      cookie: cookieHeader
    }
  });

  if (!res.ok) {
    throw new Error('No fue posible cargar la configuración del usuario.');
  }

  return (await res.json()) as Settings;
}

function ArrowRightIcon() {
  return (
    <svg className="size-4 text-[#1a1a1a]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9.29 6.71a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-4.58 4.58a1 1 0 1 1-1.42-1.42L13.17 12 9.3 8.13a1 1 0 0 1-.01-1.42Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg className="size-5 text-[#1a1a1a]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10.5 6.5 5 12l5.5 5.5M6 12h13"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="size-9 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-7 8a7 7 0 0 1 14 0"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconGlyph({
  name
}: {
  name: 'bell' | 'bank' | 'shield' | 'star' | 'privacy' | 'terms' | 'phone';
}) {
  const common = 'size-4 text-(--color-text-brand)';
  if (name === 'bell') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 4a4 4 0 0 0-4 4v2.5L6 13v1h12v-1l-2-2.5V8a4 4 0 0 0-4-4Zm-2 12a2 2 0 0 0 4 0"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (name === 'bank') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 10V8l8-4 8 4v2H4Zm2 2h2v6H6v-6Zm4 0h4v6h-4v-6Zm6 0h2v6h-2v-6ZM4 20h16v2H4v-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (name === 'shield') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3 5 6v6c0 5 3.4 8.5 7 9 3.6-.5 7-4 7-9V6l-7-3Zm-1 11-2-2 1.4-1.4 1.6 1.6 3.6-3.6L17 10l-5 5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (name === 'star') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="m12 3 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.2l5.9-.9L12 3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (name === 'privacy') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M8 3h8v3H8V3Zm-2 5h12v13H6V8Zm3 3h6v1.5H9V11Zm0 3h6v1.5H9V14Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (name === 'terms') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M7 3h7l4 4v14H7V3Zm7 1.5V8h3.5L14 4.5ZM9 11h6v1.5H9V11Zm0 3h6v1.5H9V14Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7.5 2.5A2.5 2.5 0 0 0 5 5v14l4.5-2h9A2.5 2.5 0 0 0 21 14.5V5A2.5 2.5 0 0 0 18.5 2.5h-11Zm4 4h5v1.5h-5V6.5Zm-3 3h8v1.5h-8V9.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SettingsItem({
  href,
  label,
  icon,
  rounded = 'none'
}: {
  href: string;
  label: string;
  icon: 'bell' | 'bank' | 'shield' | 'star' | 'privacy' | 'terms' | 'phone';
  rounded?: 'top' | 'bottom' | 'none';
}) {
  const roundedClass =
    rounded === 'top'
      ? 'rounded-tl-[8px] rounded-tr-[8px]'
      : rounded === 'bottom'
        ? 'rounded-bl-[8px] rounded-br-[8px]'
        : '';

  return (
    <Link
      href={href}
      className={`flex items-center justify-between border-b border-[#f2f2f2] bg-white px-3 py-3 hover:bg-[#fafbfc] ${roundedClass}`}
    >
      <span className="flex items-center gap-3">
        <IconGlyph name={icon} />
        <span className="text-xs font-semibold leading-5 text-[#757575]">{label}</span>
      </span>
      <ArrowRightIcon />
    </Link>
  );
}

export default async function SettingsPage() {
  const settings = await getSettings();
  const { user } = settings;

  return (
    <main className="relative min-h-full w-full bg-[#f2f3f7] px-6 pb-8 pt-11">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[56%] opacity-50"
        style={{
          background:
            'linear-gradient(181.76deg, rgba(208,240,246,1) 1.06%, rgba(242,243,247,1) 98.85%)'
        }}
        aria-hidden
      />

      <div className="relative z-[1] flex flex-col gap-6">
        <header className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center rounded p-0.5"
            aria-label="Volver al inicio"
          >
            <BackIcon />
          </Link>
          <h1 className="text-[18px] font-normal leading-7 text-[#1a1a1a]">PERFIL</h1>
        </header>

        <section className="relative rounded-xl bg-white px-[71px] py-4">
          <div className="flex flex-col items-center gap-3">
            <div className="grid size-12 place-items-center rounded-full bg-[#94e0ed]">
              <UserIcon />
            </div>
            <div className="text-center">
              <p className="text-base font-semibold leading-6 text-[#1a1a1a]">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-[10px] font-normal leading-5 text-(--color-text-brand)">
                Última conexión 10 de abril / 09:40
              </p>
            </div>
          </div>
          <button
            type="button"
            className="absolute right-4 top-4 grid size-6 place-items-center rounded bg-[#d0f0f6] text-(--color-text-brand)"
            aria-label="Editar perfil"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="m4 16 8-8 4 4-8 8H4v-4Zm13.7-8.3-1.4 1.4-4-4 1.4-1.4a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </section>

        <section className="space-y-3" aria-label="Información">
          <h2 className="text-sm font-normal leading-[normal] text-[#1a1a1a]">Información</h2>
          <div>
            <SettingsItem href="/settings" icon="bell" label="Notificaciones" rounded="top" />
            <SettingsItem href="/settings" icon="bank" label="Cuentas" />
            <SettingsItem href="/settings" icon="shield" label="Seguridad" rounded="bottom" />
          </div>
        </section>

        <section className="space-y-3" aria-label="General">
          <h2 className="text-sm font-normal leading-[normal] text-[#1a1a1a]">General</h2>
          <div>
            <SettingsItem href="/settings" icon="star" label="Califícanos" rounded="top" />
            <SettingsItem href="/privacy" icon="privacy" label="Política de privacidad" />
            <SettingsItem href="/terms" icon="terms" label="Términos y condiciones" />
            <SettingsItem href="/settings" icon="phone" label="Contáctanos" rounded="bottom" />
          </div>
        </section>

        <form action="/api/mock-logout" method="post" className="pt-1">
          <button
            type="submit"
            className="mx-auto flex h-12 w-full max-w-[312px] items-center justify-center gap-3 rounded-[8px] bg-transparent px-4 py-4 text-sm font-semibold leading-[22px] text-(--color-text-brand) shadow-[0_4px_4px_4px_#e2e2e2] hover:opacity-95"
          >
            <span>Cerrar sesión</span>
            <svg
              className="size-5 text-(--color-text-brand)"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M10 7 5 12l5 5M6 12h9M14 5h4v14h-4"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </main>
  );
}
