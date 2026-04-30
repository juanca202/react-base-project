'use client';

import { OTPFieldPreview as OTPField } from '@base-ui/react/otp-field';
import { Button } from '@base-ui/react/button';
import { useCallback, useState } from 'react';
import { MOCK_VALID_OTP, requestOtpCodeMock, verifyOtpMock } from '../api/verify-otp-mock';

const slotClass =
  'size-11 rounded-lg border border-zinc-300 bg-white text-center text-lg font-medium tabular-nums text-zinc-900 outline-none transition-[box-shadow,border-color] focus:border-zinc-900 focus:ring-2 focus:ring-zinc-400/40 disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-300 dark:focus:ring-zinc-500/30';

export function OtpVerificationForm() {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [resendHint, setResendHint] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setResendHint(null);
      setStatus('submitting');
      setMessage(null);
      const result = await verifyOtpMock(value);
      if (result.ok) {
        setStatus('success');
        setMessage('Verificación correcta (mock).');
      } else {
        setStatus('error');
        setMessage(result.message);
      }
    },
    [value]
  );

  const handleResend = useCallback(async () => {
    setResending(true);
    setResendHint(null);
    await requestOtpCodeMock();
    setResending(false);
    setResendHint('Código reenviado (simulado). Revisa la consola del mock.');
  }, []);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200" htmlFor="otp-field">
          Código de verificación
        </label>
        <OTPField.Root
          id="otp-field"
          length={6}
          name="otp"
          value={value}
          onValueChange={(v) => {
            setValue(v);
            if (status !== 'idle') {
              setStatus('idle');
              setMessage(null);
            }
          }}
          className="flex flex-wrap items-center gap-2"
          disabled={status === 'submitting' || status === 'success'}
        >
          <OTPField.Input aria-label="Dígito 1" className={slotClass} />
          <OTPField.Input aria-label="Dígito 2" className={slotClass} />
          <OTPField.Input aria-label="Dígito 3" className={slotClass} />
          <OTPField.Input aria-label="Dígito 4" className={slotClass} />
          <OTPField.Input aria-label="Dígito 5" className={slotClass} />
          <OTPField.Input aria-label="Dígito 6" className={slotClass} />
        </OTPField.Root>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Demo: el código válido es <span className="font-mono">{MOCK_VALID_OTP}</span>.
        </p>
      </div>

      {message ? (
        <p
          className={
            status === 'success'
              ? 'text-sm font-medium text-emerald-700 dark:text-emerald-400'
              : 'text-sm font-medium text-red-600 dark:text-red-400'
          }
          role={status === 'error' ? 'alert' : 'status'}
        >
          {message}
        </p>
      ) : null}

      {resendHint ? <p className="text-sm text-zinc-600 dark:text-zinc-400">{resendHint}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          disabled={status === 'submitting' || status === 'success' || value.length !== 6}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900"
        >
          {status === 'submitting' ? 'Verificando…' : 'Verificar'}
        </Button>
        <Button
          type="button"
          onClick={handleResend}
          disabled={resending || status === 'success'}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-300 bg-transparent px-4 text-sm font-medium text-zinc-800 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-900/50"
        >
          {resending ? 'Enviando…' : 'Reenviar código (mock)'}
        </Button>
      </div>
    </form>
  );
}
