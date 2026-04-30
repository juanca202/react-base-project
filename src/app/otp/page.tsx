import Link from 'next/link';
import { OtpVerificationForm } from '@/features/otp-verification/ui/otp-verification-form';

export default function OtpPage() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-col gap-6 p-6">
      <header>
        <Link
          href="/"
          className="text-sm text-zinc-600 underline underline-offset-4 hover:text-foreground dark:text-zinc-400"
        >
          ← Volver
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Verificación OTP</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Introduce el código de seis dígitos. La verificación usa un mock en el cliente.
        </p>
      </header>

      <OtpVerificationForm />
    </div>
  );
}
