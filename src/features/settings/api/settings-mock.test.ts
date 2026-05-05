import { describe, expect, it } from 'vitest';
import { buildMockSettings } from '@/features/settings/api/settings-mock';

describe('buildMockSettings', () => {
  it('mapea username con separadores a firstName, lastName y email', () => {
    const result = buildMockSettings('maria.perez');

    expect(result).toEqual({
      user: {
        username: 'maria.perez',
        firstName: 'Maria',
        lastName: 'Perez',
        email: 'maria.perez@example.com'
      }
    });
  });

  it('usa fallback estable cuando el username es vacío', () => {
    const result = buildMockSettings('   ');

    expect(result.user.username).toBe('demo.user');
    expect(result.user.firstName).toBe('Demo');
    expect(result.user.lastName).toBe('User');
    expect(result.user.email).toBe('demo.user@example.com');
  });
});
