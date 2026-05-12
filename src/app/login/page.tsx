import { Suspense } from 'react';
import type { Metadata } from 'next';
import { LoginForm } from './login-form';

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description: 'Acceso a la demostración de banca web'
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh bg-gradient-to-b from-[#f2f3f7] from-[49%] to-[#d0f0f6]" />
      }
    >
      <LoginForm />
    </Suspense>
  );
}
