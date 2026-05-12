/**
 * JWT de demostración sin firma criptográfica real. Solo para mocks (RN-06).
 * El payload incluye `sub` con el nombre de usuario, según api-token-login.
 */
export function createDemoJwt(username: string): string {
  const header = base64UrlJson({ alg: 'none', typ: 'JWT' });
  const payload = base64UrlJson({ sub: username, demo: true });
  return `${header}.${payload}.demo-signature`;
}

export function createDemoRefreshToken(username: string): string {
  return `demo-refresh-${encodeURIComponent(username)}`;
}

function base64UrlJson(obj: object): string {
  const json = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function readUsernameFromDemoJwt(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;
  try {
    const payloadJson = base64UrlDecode(parts[1]);
    const payload = JSON.parse(payloadJson) as { sub?: string };
    return typeof payload.sub === 'string' ? payload.sub : null;
  } catch {
    return null;
  }
}

function base64UrlDecode(segment: string): string {
  const padded = segment.replace(/-/g, '+').replace(/_/g, '/');
  const padLen = (4 - (padded.length % 4)) % 4;
  const base64 = padded + '='.repeat(padLen);
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
