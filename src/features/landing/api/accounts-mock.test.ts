import { describe, expect, it, vi } from 'vitest';
import { getAccountsMock } from '@/features/landing/api/accounts-mock';

describe('getAccountsMock', () => {
  it('retorna cuentas demo con tipos esperados', async () => {
    const accounts = await getAccountsMock();

    expect(accounts).toHaveLength(3);
    expect(accounts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'acc-001',
          type: 'saving'
        }),
        expect.objectContaining({
          id: 'acc-002',
          type: 'checking'
        }),
        expect.objectContaining({
          id: 'acc-003',
          type: 'credit-card'
        })
      ])
    );
  });

  it('simula una latencia de 350ms antes de responder', async () => {
    vi.useFakeTimers();

    const promise = getAccountsMock();
    let settled = false;
    promise.then(() => {
      settled = true;
    });

    await vi.advanceTimersByTimeAsync(349);
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    await expect(promise).resolves.toHaveLength(3);

    vi.useRealTimers();
  });
});
