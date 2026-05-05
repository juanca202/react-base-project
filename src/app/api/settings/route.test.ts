import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GET } from '@/app/api/settings/route';
import { buildMockSettings } from '@/features/settings/api/settings-mock';
import { parseUsernameFromDemoJwt } from '@/lib/demo-auth';

vi.mock('next/headers', () => ({
  cookies: vi.fn()
}));

vi.mock('@/features/settings/api/settings-mock', () => ({
  buildMockSettings: vi.fn()
}));

vi.mock('@/lib/demo-auth', () => ({
  DEMO_ACCESS_TOKEN_COOKIE: 'demo_access_token',
  parseUsernameFromDemoJwt: vi.fn()
}));

const cookiesMock = vi.mocked((await import('next/headers')).cookies);

describe('GET /api/settings', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('responde 401 cuando no hay sesión válida', async () => {
    cookiesMock.mockResolvedValueOnce({
      get: vi.fn().mockReturnValue({ value: 'token-invalido' })
    } as unknown as Awaited<ReturnType<typeof cookiesMock>>);
    vi.mocked(parseUsernameFromDemoJwt).mockReturnValueOnce(null);

    const response = await GET();
    const payload = await response.json();

    expect(response.status).toBe(401);
    expect(payload).toEqual({ error: 'Sesión inválida o ausente.' });
    expect(buildMockSettings).not.toHaveBeenCalled();
  });

  it('responde 200 con Settings del usuario autenticado', async () => {
    cookiesMock.mockResolvedValueOnce({
      get: vi.fn().mockReturnValue({ value: 'token-valido' })
    } as unknown as Awaited<ReturnType<typeof cookiesMock>>);
    vi.mocked(parseUsernameFromDemoJwt).mockReturnValueOnce('demo.user');
    vi.mocked(buildMockSettings).mockReturnValueOnce({
      user: {
        username: 'demo.user',
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo.user@example.com'
      }
    });

    const response = await GET();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(buildMockSettings).toHaveBeenCalledWith('demo.user');
    expect(payload).toEqual({
      user: {
        username: 'demo.user',
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo.user@example.com'
      }
    });
  });
});
