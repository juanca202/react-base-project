import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-bg-default)] pb-12">
      <div className="mx-auto w-full max-w-[360px] px-6 pt-8">
        <h1 className="m-0 text-[20px] font-semibold leading-7 text-[var(--color-text-heading-emphasis)]">
          Términos y condiciones
        </h1>
        <p className="mt-4 text-[length:var(--text-body-base-size)] leading-relaxed text-[var(--color-text-default)]">
          Este es un texto demostrativo de los términos y condiciones de uso. En producción, aquí se
          incluirían las condiciones contractuales, limitaciones de responsabilidad, uso aceptable
          del servicio y procedimientos de resolución de disputas.
        </p>
        <p className="mt-4 text-[length:var(--text-body-base-size)] leading-relaxed text-[var(--color-text-default)]">
          Al utilizar la aplicación, el usuario acepta la versión vigente de estos términos
          publicada por la organización.
        </p>
        <p className="mt-8">
          <Link
            href="/settings"
            className="text-[length:var(--text-body-base-size)] font-medium text-[var(--color-text-brand)] underline underline-offset-2 outline-none hover:text-[var(--color-text-brand-secondary)] focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2"
          >
            Volver a configuración
          </Link>
        </p>
      </div>
    </main>
  );
}
