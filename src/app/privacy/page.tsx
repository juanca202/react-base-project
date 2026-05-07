import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-bg-default)] pb-12">
      <div className="mx-auto w-full max-w-[360px] px-6 pt-8">
        <h1 className="m-0 text-[20px] font-semibold leading-7 text-[var(--color-text-heading-emphasis)]">
          Política de privacidad
        </h1>
        <p className="mt-4 text-[length:var(--text-body-base-size)] leading-relaxed text-[var(--color-text-default)]">
          Este es un texto demostrativo de la política de privacidad del producto. En un entorno
          real, aquí se describiría el tratamiento de datos personales, finalidades, derechos del
          titular y canales de contacto, según la normativa aplicable.
        </p>
        <p className="mt-4 text-[length:var(--text-body-base-size)] leading-relaxed text-[var(--color-text-default)]">
          La versión vinculante será la publicada por la organización y actualizada cuando
          corresponda.
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
