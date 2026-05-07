export const AUTH_COOKIE = 'auth_token';
export const REFRESH_COOKIE = 'refresh_token';

type MockJwtPayload = {
  sub: string;
  iat: number;
  exp: number;
};

function toBase64Url(value: string): string {
  return Buffer.from(value).toString('base64url');
}

function fromBase64Url(value: string): string {
  return Buffer.from(value, 'base64url').toString('utf8');
}

export function createMockToken(username: string): string {
  const now = Math.floor(Date.now() / 1000);
  const header = toBase64Url(JSON.stringify({ alg: 'none', typ: 'JWT' }));
  const payload: MockJwtPayload = {
    sub: username,
    iat: now,
    exp: now + 60 * 60
  };

  return `${header}.${toBase64Url(JSON.stringify(payload))}.demo`;
}

export function createMockRefreshToken(username: string): string {
  return toBase64Url(`${username}:${Date.now()}`);
}

export function hasValidSessionToken(token?: string): boolean {
  if (!token) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  try {
    const payloadRaw = fromBase64Url(parts[1]);
    const payload = JSON.parse(payloadRaw) as Partial<MockJwtPayload>;

    if (!payload.exp || typeof payload.exp !== 'number') return false;

    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  } catch {
    return false;
  }
}

/** Extrae `sub` del JWT mock (demo). */
export function getUsernameFromSessionToken(token: string): string | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const payloadRaw = fromBase64Url(parts[1]);
    const payload = JSON.parse(payloadRaw) as Partial<MockJwtPayload>;
    return typeof payload.sub === 'string' ? payload.sub : null;
  } catch {
    return null;
  }
}
