/**
 * Autenticación mock para la demo (US-001 / RN-06). No sustituye política de seguridad de producción.
 * Codificación JWT mínima sin firma criptográfica; solo para cookies HTTP-only y lectura de `sub` en layout/proxy.
 */

export const DEMO_ACCESS_TOKEN_COOKIE = 'demo_access_token';
export const DEMO_REFRESH_TOKEN_COOKIE = 'demo_refresh_token';
/** Cookie legada; se elimina en logout por si quedó de versiones anteriores. */
export const LEGACY_MOCK_SESSION_COOKIE = 'mock_session';

const COOKIE_BASE = {
  httpOnly: true,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 8
};

function base64UrlEncodeUtf8(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecodeToString(input: string): string {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padLen = (4 - (normalized.length % 4)) % 4;
  const padded = normalized + '='.repeat(padLen);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

/** JWT de demo: payload incluye `sub` y `name` (username) para cumplir contrato documentado en api-token-login. */
export function buildDemoJwt(username: string): string {
  const header = base64UrlEncodeUtf8(JSON.stringify({ alg: 'none', typ: 'JWT' }));
  const payload = base64UrlEncodeUtf8(
    JSON.stringify({
      sub: username,
      name: username,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + COOKIE_BASE.maxAge
    })
  );
  return `${header}.${payload}.demo-not-for-production`;
}

/** Refresh opaco de demo (no es renovación real hasta que backend lo defina). */
export function buildDemoRefreshToken(username: string): string {
  return `r.${base64UrlEncodeUtf8(JSON.stringify({ sub: username, jti: Math.random().toString(36).slice(2) }))}`;
}

export function parseUsernameFromDemoJwt(token: string | undefined): string | null {
  if (!token?.includes('.')) return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;
  try {
    const json: unknown = JSON.parse(base64UrlDecodeToString(parts[1]));
    if (!json || typeof json !== 'object') return null;
    const rec = json as Record<string, unknown>;
    const sub =
      typeof rec.sub === 'string' ? rec.sub : typeof rec.name === 'string' ? rec.name : null;
    if (!sub?.trim()) return null;
    if (typeof rec.exp === 'number' && rec.exp < Math.floor(Date.now() / 1000)) return null;
    return sub.trim();
  } catch {
    return null;
  }
}

export function demoAuthCookieOptions() {
  return { ...COOKIE_BASE };
}
