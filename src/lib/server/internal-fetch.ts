import { cookies, headers } from 'next/headers';

/**
 * Petición `fetch` desde Server Component / Ruta hacia la propia app,
 * reenviando cookies (sesión demo) para endpoints que validan JWT en cookie.
 */
export async function fetchInternalApi(path: string, init?: RequestInit): Promise<Response> {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  const proto = h.get('x-forwarded-proto') ?? 'http';
  if (!host) {
    throw new Error('Host ausente: no se puede llamar a la API interna');
  }
  const jar = await cookies();
  const cookie = jar
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
  const url = `${proto}://${host}${path}`;
  const merged = new Headers(init?.headers);
  merged.set('cookie', cookie);
  return fetch(url, {
    ...init,
    cache: 'no-store',
    headers: merged
  });
}
