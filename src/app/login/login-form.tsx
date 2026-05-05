'use client';

import { Button } from '@base-ui/react/button';
import { Input } from '@base-ui/react/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const fieldClass =
  'h-[52px] w-full rounded-lg border-0 bg-white px-4 text-sm text-[#1a1a1a] shadow-[0_1px_3px_rgba(0,0,0,0.06)] outline-none placeholder:text-[#757575] focus:ring-2 focus:ring-[#008292]/25';

function IconEye({ visible }: { visible: boolean }) {
  if (visible) {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="text-[#757575]"
      >
        <path
          fill="currentColor"
          d="M12 5c-5 0-9 5-9 7s4 7 9 7 9-5 9-7-4-7-9-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
        />
      </svg>
    );
  }
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-[#757575]"
    >
      <path
        fill="currentColor"
        d="M3.98 6.28.87 3.16l1.41-1.41 19.14 19.14-1.41 1.41-3.05-3.05A10.9 10.9 0 0 1 12 19c-5 0-9-5-9-7 0-1.1.87-2.65 2.35-4.28l-1.37-1.44ZM12 9a3 3 0 0 1 3 3c0 .35-.06.68-.17 1l-3.83-3.83c.32-.11.65-.17 1-.17Zm-7.88-.77 2.15 2.15A8.85 8.85 0 0 0 3 12c0 2 4 7 9 7 1.55 0 3.03-.45 4.33-1.15l2.45 2.45 1.41-1.41-18-18-1.41 1.41 2.32 2.32Z"
      />
    </svg>
  );
}

function IconLoginArrow() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0 text-white"
    >
      <path
        fill="currentColor"
        d="M15 3h4v4h-2V6.41l-5.3 5.3-1.4-1.42L15.58 5H15V3ZM4 7v10a2 2 0 0 0 2 2h12v-4h2v4a2 2 0 0 1-2 2H6a4 4 0 0 1-4-4V7h2Z"
      />
    </svg>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setStatus('submitting');

    try {
      const res = await fetch('/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username: username.trim(), password: password.trim() })
      });

      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
        /* respuesta sin JSON */
      }

      if (!res.ok) {
        const msg =
          data &&
          typeof data === 'object' &&
          'error' in data &&
          typeof (data as { error: unknown }).error === 'string'
            ? (data as { error: string }).error
            : 'No se pudo iniciar sesión.';
        setErrorMessage(msg);
        setStatus('idle');
        return;
      }

      router.push('/');
      router.refresh();
    } catch {
      setErrorMessage('Error de red. Inténtalo de nuevo.');
      setStatus('idle');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Input
            name="username"
            autoComplete="username"
            value={username}
            onValueChange={setUsername}
            type="text"
            placeholder="Alias o usuario"
            aria-label="Alias o usuario"
            className={fieldClass}
            required
          />
          <button
            type="button"
            className="text-right text-xs leading-5 text-[#757575] transition-opacity hover:opacity-80"
          >
            ¿Olvidaste tu usuario?
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative">
            <Input
              name="password"
              autoComplete="current-password"
              value={password}
              onValueChange={setPassword}
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              aria-label="Contraseña"
              className={`${fieldClass} pr-12`}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 hover:bg-zinc-100"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              onClick={() => setShowPassword((v) => !v)}
            >
              <IconEye visible={!showPassword} />
            </button>
          </div>
          <button
            type="button"
            className="text-right text-xs leading-5 text-[#757575] transition-opacity hover:opacity-80"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>

      {errorMessage ? (
        <p className="text-sm font-medium text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={status === 'submitting'}
        className="flex h-[54px] w-full items-center justify-center gap-3 rounded-lg bg-[#008292] px-4 text-sm font-semibold leading-[22px] text-white shadow-sm transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span>{status === 'submitting' ? 'Entrando...' : 'Iniciar sesión'}</span>
        {status === 'idle' ? <IconLoginArrow /> : null}
      </Button>
    </form>
  );
}
