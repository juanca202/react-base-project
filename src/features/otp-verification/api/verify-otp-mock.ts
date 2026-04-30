/** Código aceptado por el mock de verificación (solo demo). */
export const MOCK_VALID_OTP = '123456';

const MOCK_DELAY_MS = 900;

export type VerifyOtpMockResult = { ok: true } | { ok: false; message: string };

/**
 * Simula una llamada al backend: latencia fija y validación contra un OTP fijo.
 */
export async function verifyOtpMock(code: string): Promise<VerifyOtpMockResult> {
  await new Promise((r) => setTimeout(r, MOCK_DELAY_MS));
  const normalized = code.replace(/\s/g, '');
  if (normalized.length !== 6) {
    return { ok: false, message: 'Introduce los 6 dígitos.' };
  }
  if (normalized === MOCK_VALID_OTP) {
    return { ok: true };
  }
  return { ok: false, message: 'Código incorrecto. Inténtalo de nuevo.' };
}

/**
 * Simula el envío / reenvío del código por SMS o email.
 */
export async function requestOtpCodeMock(): Promise<{ ok: true }> {
  await new Promise((r) => setTimeout(r, 500));
  return { ok: true };
}
