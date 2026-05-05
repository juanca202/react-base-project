import Image from 'next/image';
import { LoginForm } from './login-form';

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col justify-center p-6">
      <section className="rounded-2xl bg-bg-secondary p-6 shadow-[var(--shadow-200)]">
        <div className="mb-4 flex justify-center">
          <Image
            src="/assets/login/logo.svg"
            alt=""
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </div>
        <h1 className="text-2xl font-semibold text-color-text-default">Iniciar sesión</h1>
        <p className="mt-2 text-sm text-color-text-secondary">
          Accede a tu banca digital. Esta autenticación es simulada con mocks.
        </p>

        <LoginForm />
      </section>
    </main>
  );
}
