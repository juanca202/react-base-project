import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import Image from 'next/image';
import { LoginForm } from './login-form';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Demo banking sign-in'
};

function IconBank() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-(--color-text-brand)"
    >
      <path
        fill="currentColor"
        d="M4 10V8l8-4 8 4v2H4Zm2 2h2v6H6v-6Zm4 0h4v6h-4v-6Zm6 0h2v6h-2v-6ZM4 20h16v2H4v-2Z"
      />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-[#1a1a1a]"
    >
      <path
        fill="currentColor"
        d="M9.29 6.71a1 1 0 0 1 0 1.41L13.17 12l-3.88 3.88a1 1 0 1 0 1.42 1.42l4.59-4.59a1 1 0 0 0 0-1.42l-4.58-4.6a1 1 0 0 1-1.41 0Z"
      />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <div className={`relative flex min-h-full flex-1 flex-col bg-[#f2f3f7] ${lexend.className}`}>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-b from-transparent via-[#f2f3f7] to-[#d0f0f6]/45"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto flex w-full max-w-[360px] flex-1 flex-col px-6 pb-6 pt-10">
        <div className="flex justify-center">
          <Image
            src="/assets/login/logo.svg"
            alt=""
            width={72}
            height={75}
            className="h-[74px] w-[71px]"
            unoptimized
          />
        </div>

        <h1 className="mt-8 text-center text-xl font-normal leading-[30px] tracking-normal text-[#1a1a1a]">
          <span className="block">Bienvenido a</span>
          <span className="block">tu banca móvil</span>
        </h1>

        <p className="mt-6 text-center text-base font-normal leading-6 text-[#757575]">
          Ingresa con usuario y contraseña
        </p>

        <div className="mt-10">
          <LoginForm />
        </div>

        <button
          type="button"
          className="mt-6 text-center text-sm font-semibold leading-[22px] text-(--color-text-brand) hover:opacity-90"
        >
          Crear usuario
        </button>

        <button
          type="button"
          className="mt-5 flex w-full items-center justify-between rounded-lg bg-white px-3 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-opacity hover:opacity-95"
        >
          <span className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-[20px] bg-[#eff6f7] p-3">
              <IconBank />
            </span>
            <span className="text-xs font-normal leading-5 text-[#181c1e]">
              Solicitar productos
            </span>
          </span>
          <IconChevronRight />
        </button>

        <button
          type="button"
          className="mx-auto mt-6 text-center text-xs font-bold leading-4 text-(--color-text-brand) underline decoration-solid underline-offset-2 [text-decoration-skip-ink:none] hover:opacity-90"
        >
          ¿Necesitas ayuda?
        </button>

        <div className="min-h-6 flex-1" aria-hidden />

        <p className="mt-4 text-right text-[10px] font-normal leading-5 text-[#474747]">
          Versión 1.02v
        </p>
      </div>
    </div>
  );
}
