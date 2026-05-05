import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="flex min-h-full w-full flex-col gap-4 px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-semibold text-text-default">Términos y condiciones</h1>
      <p className="rounded-xl bg-bg-secondary p-4 text-sm text-text-secondary">
        Contenido de términos para la demo. Aquí se mostrará el documento oficial del producto.
      </p>
      <Link href="/settings" className="text-sm font-medium text-text-brand">
        Volver a configuración
      </Link>
    </main>
  );
}
