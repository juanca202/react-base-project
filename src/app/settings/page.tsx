'use client';

import { SettingsPerfilView } from '@/features/settings/ui/settings-perfil-view';
import type { SettingsUser } from '@/lib/mock-settings-user';
import { useRouter } from 'next/navigation';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';

const LOADING_BG: CSSProperties = {
  backgroundImage: 'linear-gradient(180deg, #f2f3f7 0%, #f2f3f7 49.038%, #d0f0f6 100%)'
};

async function loadSettings(): Promise<
  { ok: true; user: SettingsUser } | { ok: false; unauthorized: boolean }
> {
  const res = await fetch('/api/settings', { credentials: 'same-origin' });
  if (res.status === 401) {
    return { ok: false, unauthorized: true };
  }
  if (!res.ok) {
    return { ok: false, unauthorized: false };
  }
  const data = (await res.json()) as { user: SettingsUser };
  return { ok: true, user: data.user };
}

function formatLastConnectionLabel(now: Date): string {
  const day = now.getDate();
  const month = now.toLocaleString('es', { month: 'long' });
  const time = now.toLocaleTimeString('es-EC', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  return `Última conexión ${day} de ${month} / ${time}`;
}

function displayNameFromUser(user: SettingsUser): string {
  return `${user.firstName} ${user.lastName}`.trim();
}

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<SettingsUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const lastConnectionLabel = useMemo(() => formatLastConnectionLabel(new Date()), []);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const result = await loadSettings();
      if (cancelled) return;

      if (result.ok === false && result.unauthorized) {
        router.replace('/iniciar-sesion');
        setLoading(false);
        return;
      }

      if (result.ok === false) {
        setError('No se pudo cargar la configuración.');
        setLoading(false);
        return;
      }

      setUser(result.user);
      setError(null);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleLogout() {
    await fetch('/api/mock-logout', { method: 'POST', credentials: 'same-origin' });
    router.replace('/iniciar-sesion');
  }

  if (loading) {
    return (
      <main className="min-h-screen w-full" style={LOADING_BG}>
        <p className="m-0 px-6 pt-24 text-center text-[14px] text-[#606060]">Cargando…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen w-full" style={LOADING_BG}>
        <p
          className="m-0 px-6 pt-24 text-center text-[14px] text-[var(--color-text-danger)]"
          role="alert"
        >
          {error}
        </p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SettingsPerfilView
      displayName={displayNameFromUser(user)}
      lastConnectionLabel={lastConnectionLabel}
      onLogout={handleLogout}
    />
  );
}
