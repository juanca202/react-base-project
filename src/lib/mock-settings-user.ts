import { firstNameFromUsername } from '@/features/landing/lib/display-name';

export type SettingsUser = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

/** Perfil demo derivado del `sub` del JWT mock (misma persona que la sesión). */
export function mockSettingsUserFromLoginUsername(username: string): SettingsUser {
  const safe = username.trim() || 'usuario';
  const segments = safe.split(/[.@\s]+/).filter(Boolean);
  const firstName = firstNameFromUsername(segments[0] ?? safe);
  const lastName =
    segments.length > 1
      ? segments
          .slice(1)
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
          .join(' ')
      : 'Apellido';

  const email = safe.includes('@') ? safe : `${safe.replace(/\s+/g, '.')}@example.com`;

  return {
    username: safe,
    firstName,
    lastName,
    email
  };
}
