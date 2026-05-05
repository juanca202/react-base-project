import { describe, expect, it, vi } from 'vitest';
import { GET } from '@/app/api/accounts/route';
import { getAccountsMock } from '@/features/landing/api/accounts-mock';

vi.mock('@/features/landing/api/accounts-mock', () => ({
  getAccountsMock: vi.fn()
}));

describe('GET /api/accounts', () => {
  it('responde un JSON con las cuentas mock', async () => {
    const mockedAccounts = [{ id: 'a1', number: '1111', balance: 100, type: 'saving' as const }];

    vi.mocked(getAccountsMock).mockResolvedValueOnce(mockedAccounts);

    const response = await GET();
    const payload = await response.json();

    expect(getAccountsMock).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(payload).toEqual(mockedAccounts);
  });
});
