import { Button } from '@base-ui/react/button';
import { Input } from '@base-ui/react/input';

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col justify-center p-6">
      <section className="rounded-2xl bg-bg-secondary p-6 shadow-[var(--shadow-200)]">
        <h1 className="text-2xl font-semibold text-color-text-default">Iniciar sesión</h1>
        <p className="mt-2 text-sm text-color-text-secondary">
          Accede a tu banca digital. Esta autenticación es simulada con mocks.
        </p>

        <form action="/api/mock-login" method="post" className="mt-6 space-y-4">
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
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-bg-brand px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Entrar
          </Button>
        </form>
      </section>
    </main>
  );
}
