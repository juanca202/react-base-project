import { describe, expect, it, vi } from 'vitest';
import { GET } from '@/app/api/activity/route';
import { getRecentActivityMock } from '@/features/landing/api/activity-mock';

vi.mock('@/features/landing/api/activity-mock', () => ({
  getRecentActivityMock: vi.fn()
}));

describe('GET /api/activity', () => {
  it('responde un JSON con la actividad mock', async () => {
    const mockedActivity = [
      {
        accountNumber: '1111',
        date: '2026-05-05T09:30:00Z',
        description: 'Pago de servicio',
        amount: -42.75
      }
    ];

    vi.mocked(getRecentActivityMock).mockResolvedValueOnce(mockedActivity);

    const response = await GET();
    const payload = await response.json();

    expect(getRecentActivityMock).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(payload).toEqual(mockedActivity);
  });
});
