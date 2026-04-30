import Link from 'next/link';
import { TransferFlow } from '../../features/transfers/ui/transfer-flow';

export default function TransfersPage() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-3xl flex-1 flex-col gap-6 p-6">
      <header>
        <Link
          href="/"
          className="text-sm text-zinc-600 underline underline-offset-4 hover:text-foreground"
        >
          ← Volver al inicio
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-color-text-default">
          Transferencias
        </h1>
        <p className="mt-2 text-sm text-color-text-secondary">
          Simulación con servicios mock: valida los datos de la transferencia y confirma con OTP.
        </p>
      </header>

      <TransferFlow />
    </main>
  );
}
