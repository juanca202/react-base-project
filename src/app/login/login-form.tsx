'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Field } from '@base-ui/react/field';
import { Button } from '@base-ui/react/button';
import {
  figmaLoginAssets,
  figmaLoginIntrinsicPx,
  type FigmaLoginIntrinsicKey
} from './figma-assets';

const inputClass =
  'box-border w-full min-h-[52px] rounded-sm border border-[var(--color-surface)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none ring-[var(--color-primary)] placeholder:text-[var(--color-text-tertiary)] focus-visible:ring-2';

const linkMutedClass =
  'cursor-pointer border-0 bg-transparent p-0 text-right text-xs leading-5 text-[var(--color-text-tertiary)] hover:underline';

function ScaledFigmaSvg({
  src,
  alt,
  intrinsicKey,
  boxClassName,
  imageClassName = '',
  priority = false
}: {
  src: string;
  alt: string;
  intrinsicKey: FigmaLoginIntrinsicKey;
  boxClassName: string;
  imageClassName?: string;
  priority?: boolean;
}) {
  const { width, height } = figmaLoginIntrinsicPx[intrinsicKey];
  return (
    <span className={boxClassName}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        priority={priority}
        className={`max-h-full max-w-full object-contain ${imageClassName}`}
        aria-hidden={alt === ''}
      />
    </span>
  );
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = username.trim().length > 0 && password.trim().length > 0 && !submitting;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim()
        })
      });

      if (!res.ok) {
        let message = 'No se pudo iniciar sesión';
        try {
          const data = (await res.json()) as { message?: string };
          if (typeof data.message === 'string') message = data.message;
        } catch {
          /* ignore */
        }
        setError(message);
        return;
      }

      const next = searchParams.get('next');
      const safe = next && next.startsWith('/') && !next.startsWith('//') ? next : '/summary';
      router.replace(safe);
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-gradient-to-b from-[#f2f3f7] from-[49%] to-[#d0f0f6] px-6 pb-10 pt-14 text-[var(--color-text-primary)]">
      <div className="mx-auto flex w-full max-w-[360px] flex-1 flex-col items-center">
        <ScaledFigmaSvg
          src={figmaLoginAssets.logo}
          alt="Logotipo"
          intrinsicKey="logo"
          boxClassName="mb-8 block h-[74px] w-[72px] shrink-0"
          priority
        />

        <h1 className="mb-2 max-w-[264px] text-center text-xl font-normal leading-[30px] text-[#1a1a1a]">
          Bienvenido a <br />
          tu banca móvil
        </h1>
        <p className="mb-10 text-center text-base leading-6 text-[#757575]">
          Ingresa con usuario y contraseña
        </p>

        <form onSubmit={onSubmit} className="flex w-full max-w-[312px] flex-col gap-6" noValidate>
          <div className="flex flex-col gap-6">
            <Field.Root name="username" className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Field.Control
                  id="login-username"
                  name="username"
                  autoComplete="username"
                  placeholder="Alias o usuario"
                  aria-label="Alias o usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={inputClass}
                  required
                  aria-invalid={error ? true : undefined}
                />
                <button type="button" className={linkMutedClass}>
                  ¿Olvidaste tu usuario?
                </button>
              </div>
            </Field.Root>

            <Field.Root name="password" className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Field.Control
                    id="login-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Contraseña"
                    aria-label="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${inputClass} pr-12`}
                    required
                    aria-invalid={error ? true : undefined}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 hover:bg-black/5"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    <ScaledFigmaSvg
                      src={figmaLoginAssets.eye}
                      alt=""
                      intrinsicKey="eye"
                      boxClassName="flex h-5 w-5 items-center justify-center"
                      imageClassName={showPassword ? 'opacity-40' : 'opacity-100'}
                    />
                  </button>
                </div>
                <button type="button" className={linkMutedClass}>
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </Field.Root>
          </div>

          {error ? (
            <p className="text-center text-sm text-[var(--color-error-fg)]" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={!canSubmit}
              className="flex h-[54px] w-full items-center justify-center gap-3 rounded-sm bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold leading-[22px] text-white shadow-[var(--shadow-interactive)] transition-colors hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Iniciar sesión
              <ScaledFigmaSvg
                src={figmaLoginAssets.arrowBracket}
                alt=""
                intrinsicKey="arrowBracket"
                boxClassName="flex h-5 w-5 shrink-0 items-center justify-center"
              />
            </Button>

            <button
              type="button"
              className="border-0 bg-transparent text-center text-sm font-semibold leading-[22px] text-[var(--color-primary)] hover:underline"
            >
              Crear usuario
            </button>
          </div>
        </form>

        <div className="mt-auto flex w-full max-w-[312px] flex-col items-center gap-6 pt-10">
          <button
            type="button"
            className="flex w-full max-w-[280px] items-center justify-between gap-4 rounded-sm bg-[var(--color-surface)] px-3 py-2 text-left text-xs leading-5 text-[#181c1e] shadow-sm"
          >
            <span className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#eff6f7] p-2">
                <Image
                  src={figmaLoginAssets.productMenu}
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                  className="size-4 shrink-0"
                  aria-hidden
                />
              </span>
              Solicitar productos
            </span>
            <span className="flex size-4 shrink-0 rotate-180 items-center justify-center">
              <ScaledFigmaSvg
                src={figmaLoginAssets.chevron}
                alt=""
                intrinsicKey="chevron"
                boxClassName="flex h-4 w-4 max-w-full items-center justify-center"
              />
            </span>
          </button>

          <button
            type="button"
            className="border-0 bg-transparent text-xs font-bold leading-4 text-[var(--color-primary)] underline decoration-solid [text-decoration-skip-ink:none]"
          >
            ¿Necesitas ayuda?
          </button>

          <p className="text-[8px] leading-5 text-[#474747]">Versión 1.02v</p>
        </div>
      </div>
    </div>
  );
}
