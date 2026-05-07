/** Primer nombre legible a partir del identificador de sesión (demo). */
export function firstNameFromUsername(username: string): string {
  const segment = username.split(/[.@\s]/)[0]?.trim() ?? username;
  if (!segment) return 'Usuario';
  return segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
}
