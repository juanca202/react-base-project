'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@base-ui/react/button';

type LogoutButtonProps = {
  variant?: 'onLight' | 'onDark';
  className?: string;
};

export function LogoutButton({ variant = 'onLight', className = '' }: LogoutButtonProps) {
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

  const styles =
    variant === 'onDark'
      ? 'border-white/50 bg-white/10 text-white hover:bg-white/20'
      : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-label)] hover:bg-[var(--color-surface-alt)]';

  return (
    <Button
      type="button"
      disabled={busy}
      onClick={onLogout}
      className={`rounded-sm border px-3 py-1.5 text-xs font-semibold disabled:opacity-60 sm:px-4 sm:py-2 sm:text-sm ${styles} ${className}`}
    >
      Cerrar sesión
    </Button>
  );
}
