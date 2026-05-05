import { describe, expect, it, vi } from 'vitest';
import { getRecentActivityMock } from '@/features/landing/api/activity-mock';

describe('getRecentActivityMock', () => {
  it('retorna movimientos de actividad recientes', async () => {
    const activity = await getRecentActivityMock();

    expect(activity).toHaveLength(3);
    expect(activity[0]).toEqual(
      expect.objectContaining({
        accountNumber: '001234567890',
        description: 'Transferencia recibida',
        amount: 250
      })
    );
  });

  it('espera 350ms antes de resolver', async () => {
    vi.useFakeTimers();

    const promise = getRecentActivityMock();
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
