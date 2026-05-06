import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE, hasValidSessionToken } from '@/lib/auth';

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (hasValidSessionToken(token)) {
    redirect('/resumen');
  }

  redirect('/iniciar-sesion');
}
