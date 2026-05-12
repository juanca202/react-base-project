'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@base-ui/react/button';

export function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onLogout() {
    setBusy(true);
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      router.replace('/login');
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      type="button"
      disabled={busy}
      onClick={onLogout}
      className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-semibold text-[var(--color-text-label)] hover:bg-[var(--color-surface-alt)] disabled:opacity-60"
    >
      Cerrar sesión
    </Button>
  );
}
