'use client';

import { Button } from '@base-ui/react/button';
import { Input } from '@base-ui/react/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    if (!username || !password) {
      setError('Usuario y contraseña son obligatorios.');
      return;
    }

    setPending(true);
    try {
      const res = await fetch('/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? 'No se pudo iniciar sesión.');
        return;
      }

      router.replace('/');
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {error ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <label className="flex flex-col gap-2 text-sm text-color-text-default">
        Usuario
        <Input
          name="username"
          placeholder="priscila"
          autoComplete="username"
          required
          className="h-11 rounded-lg border border-zinc-300 bg-white px-3"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-color-text-default">
        Contraseña
        <Input
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          className="h-11 rounded-lg border border-zinc-300 bg-white px-3"
        />
      </label>

      <Button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-bg-brand px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? 'Entrando…' : 'Entrar'}
      </Button>
    </form>
  );
}
