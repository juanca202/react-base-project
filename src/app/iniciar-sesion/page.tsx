'use client';

import { Button } from '@base-ui/react/button';
import { Input } from '@base-ui/react/input';
import { Field } from '@base-ui/react/field';
import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

/* Los assets exportados desde Figma vienen como SVG; se sirven con extensión .svg. */
const LOGO = '/figma-login/logo.svg';
const ICON_EYE = '/figma-login/icon-eye.svg';
const ICON_LOGIN = '/figma-login/icon-login-arrow.svg';
const ICON_PRODUCT = '/figma-login/icon-product.svg';
const ICON_CHEVRON = '/figma-login/icon-chevron.svg';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const response = await fetch('/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      setError('No fue posible iniciar sesión con esas credenciales.');
      setIsSubmitting(false);
      return;
    }

    router.replace('/resumen');
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f2f3f7]">
      <div
        className="pointer-events-none absolute left-0 top-[346px] flex h-[471px] w-[360px] max-w-full items-center justify-center opacity-50"
        aria-hidden
      >
        <div className="flex-none rotate-180">
          <div
            className="h-[471px] w-[360px] max-w-full bg-gradient-to-b from-[#d0f0f6] to-[#f2f3f7]"
            style={{
              backgroundImage:
                'linear-gradient(181.76deg, rgb(208, 240, 246) 1.06%, rgb(242, 243, 247) 98.85%)'
            }}
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute left-0 top-0 h-16 w-full max-w-[360px] backdrop-blur-[6px]"
        aria-hidden
      />

      <main className="relative z-[1] mx-auto min-h-screen w-full max-w-[360px] px-6 pb-10 pt-[88px]">
        <div className="flex justify-center">
          <Image
            src={LOGO}
            alt="Logo"
            width={72}
            height={74}
            className="h-[74px] w-[72px] object-contain"
            priority
            unoptimized
          />
        </div>

        <h1 className="mx-auto mt-10 max-w-[264px] text-center text-[20px] font-normal leading-[30px] text-[#1a1a1a]">
          <span className="block">Bienvenido a</span>
          <span className="block">tu banca móvil</span>
        </h1>

        <p className="text-button mt-7 text-center font-normal leading-6 text-[#757575]">
          Ingresa con usuario y contraseña
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex w-full flex-col gap-6" noValidate>
          <div className="flex flex-col gap-3">
            <Field.Root name="username">
              <Field.Label className="sr-only">Alias o usuario</Field.Label>
              <div className="flex flex-col gap-2">
                <Input
                  required
                  name="username"
                  autoComplete="username"
                  value={username}
                  onValueChange={setUsername}
                  placeholder="Alias o usuario"
                  className="text-body placeholder:text-[#757575] box-border w-full rounded-100 border border-[var(--color-bg-default)] bg-[var(--color-bg-default)] px-4 py-[17px] font-normal leading-normal text-[#1a1a1a] outline-none ring-0 focus-visible:ring-2 focus-visible:ring-[var(--color-bg-brand)]"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-caption cursor-pointer border-none bg-transparent p-0 text-right font-normal leading-5 text-[#757575] hover:underline"
                  >
                    ¿Olvidaste tu usuario?
                  </button>
                </div>
              </div>
            </Field.Root>

            <Field.Root name="password">
              <Field.Label className="sr-only">Contraseña</Field.Label>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Input
                    required
                    name="password"
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onValueChange={setPassword}
                    placeholder="Contraseña"
                    className="text-body placeholder:text-[#757575] box-border h-[var(--space-1300)] w-full rounded-100 border border-[var(--color-bg-default)] bg-[var(--color-bg-default)] py-[17px] pl-4 pr-12 font-normal leading-normal text-[#1a1a1a] outline-none ring-0 focus-visible:ring-2 focus-visible:ring-[var(--color-bg-brand)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center border-none bg-transparent p-0"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    <Image
                      src={ICON_EYE}
                      alt=""
                      width={20}
                      height={16}
                      className="h-4 w-5 max-h-5 max-w-5 object-contain"
                      unoptimized
                    />
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-caption cursor-pointer border-none bg-transparent p-0 text-right font-normal leading-5 text-[#757575] hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </div>
            </Field.Root>
          </div>

          <div className="flex w-full flex-col items-stretch">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="text-body flex h-[54px] w-full cursor-pointer items-center justify-center gap-3 rounded-100 border-none bg-[var(--color-bg-brand)] px-4 py-4 font-semibold leading-[22px] text-[var(--color-text-on-brand)] outline-none transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
              {!isSubmitting ? (
                <Image
                  src={ICON_LOGIN}
                  alt=""
                  width={20}
                  height={18}
                  className="size-5 shrink-0 object-contain"
                  unoptimized
                />
              ) : null}
            </Button>
          </div>

          {error ? (
            <p
              className="text-caption text-center leading-5 text-[var(--color-text-danger)]"
              role="alert"
            >
              {error}
            </p>
          ) : null}
        </form>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="text-body cursor-pointer border-none bg-transparent p-0 font-semibold leading-[22px] text-[var(--color-text-brand)] hover:underline"
          >
            Crear usuario
          </button>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-4 rounded-100 bg-[var(--color-bg-default)] px-3 py-2">
            <div className="flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-card bg-[var(--color-bg-tertiary)]">
                <Image
                  src={ICON_PRODUCT}
                  alt=""
                  width={12}
                  height={12}
                  className="max-h-4 max-w-4 object-contain"
                  unoptimized
                />
              </div>
              <span className="text-caption font-normal leading-5 text-[var(--color-text-heading-emphasis)]">
                Solicitar productos
              </span>
            </div>
            <div className="flex size-4 shrink-0 items-center justify-center">
              <Image
                src={ICON_CHEVRON}
                alt=""
                width={19}
                height={16}
                className="max-h-4 max-w-4 rotate-180 object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="text-caption cursor-pointer border-none bg-transparent p-0 text-center font-bold leading-4 text-[var(--color-text-brand)] underline decoration-solid [text-decoration-skip-ink:none]"
          >
            ¿Necesitas ayuda?
          </button>
        </div>

        <p className="text-caption mt-8 text-center font-normal leading-5 text-[#474747]">
          Versión 1.02v
        </p>
      </main>
    </div>
  );
}
