import Link from 'next/link';

type TransfersPageProps = {
  searchParams: Promise<{ feature?: string }>;
};

function getPlaceholderLabel(feature: string | undefined) {
  switch (feature) {
    case 'services':
      return 'Servicios';
    case 'qr-payments':
      return 'Pagos QR';
    case 'withdraw':
      return 'Retirar';
    case 'payments':
      return 'Pagos';
    case 'other':
      return 'Otros';
    case 'upcoming-payments':
      return 'Pagos próximos';
    default:
      return 'Transferencias';
  }
}

export default async function TransfersPage({ searchParams }: TransfersPageProps) {
  const { feature } = await searchParams;
  const label = getPlaceholderLabel(feature);

  return (
    <main className="flex min-h-full w-full flex-col gap-4 px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-semibold text-text-default">{label}</h1>
      <p className="rounded-xl bg-bg-secondary p-4 text-sm text-text-secondary">
        Esta sección está en construcción para la demo.
      </p>
      <Link href="/" className="text-sm font-medium text-text-brand">
        Volver al resumen
      </Link>
    </main>
  );
}
