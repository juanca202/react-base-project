import type { Settings } from '@/shared/contracts/settings';

function capitalize(text: string): string {
  if (!text) return '';
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

export function buildMockSettings(username: string): Settings {
  const normalized = username.trim().toLowerCase();
  const [firstRaw = 'demo', lastRaw = 'user'] = normalized.split(/[._\-\s]+/).filter(Boolean);
  const firstName = capitalize(firstRaw);
  const lastName = capitalize(lastRaw);

  return {
    user: {
      username: normalized || 'demo.user',
      firstName,
      lastName,
      email: `${normalized || 'demo.user'}@example.com`
    }
  };
}
