import Link from 'next/link';

type DemoPlaceholderProps = {
  title: string;
};

/** Pantalla mínima para rutas de demo aún no implementadas (RN-06 US-002). */
export function DemoPlaceholder({ title }: DemoPlaceholderProps) {
  return (
    <main className="min-h-screen w-full bg-[#f2f3f7] pb-10 pt-6">
      <div className="mx-auto w-full max-w-[360px] px-6">
        <Link
          href="/resumen"
          className="mb-6 inline-block text-[length:var(--text-body-base-size)] font-medium text-[var(--color-text-brand)]"
        >
          ← Volver al resumen
        </Link>
        <h1 className="m-0 mb-4 text-[length:var(--text-title-page-size)] font-bold leading-[var(--text-title-page-line)] text-[var(--color-text-heading-emphasis)]">
          {title}
        </h1>
        <p className="m-0 text-[length:var(--text-body-base-size)] leading-[var(--text-body-base-line)] text-[var(--color-text-secondary)]">
          Esta funcionalidad está en preparación para la demostración. Pronto podrás usarla desde la
          app.
        </p>
      </div>
    </main>
  );
}
