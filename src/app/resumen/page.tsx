'use client';

import { useRouter } from 'next/navigation';

export default function ResumenPage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/mock-logout', {
      method: 'POST'
    });
    router.replace('/iniciar-sesion');
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '2rem'
      }}
    >
      <section style={{ display: 'grid', gap: '1rem', textAlign: 'center' }}>
        <h1 style={{ margin: 0 }}>Resumen</h1>
        <p style={{ margin: 0 }}>Ruta protegida de demostracion para usuarios autenticados.</p>
        <button type="button" onClick={handleLogout}>
          Cerrar sesion
        </button>
      </section>
    </main>
  );
}
