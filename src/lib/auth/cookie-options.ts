const maxAgeSeconds = 60 * 60 * 24 * 7;

export function sessionCookieOptions(): {
  httpOnly: boolean;
  sameSite: 'lax';
  path: string;
  maxAge: number;
  secure: boolean;
} {
  return {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: maxAgeSeconds,
    secure: process.env.NODE_ENV === 'production'
  };
}
