'use client';

import { OTPFieldPreview as OTPField } from '@base-ui/react/otp-field';
import { Button } from '@base-ui/react/button';
import { Input } from '@base-ui/react/input';
import { Select } from '@base-ui/react/select';
import { useMemo, useState } from 'react';
import { MOCK_VALID_OTP } from '../../otp-verification/api/verify-otp-mock';
import {
  confirmTransferOtpMock,
  mockAccounts,
  prepareTransferMock,
  requestTransferOtpMock,
  type PreparedTransfer
} from '../api/transfers-mock';

const otpSlotClass =
  'size-10 rounded-lg border border-zinc-300 bg-white text-center text-lg font-medium tabular-nums text-zinc-900 outline-none transition-[box-shadow,border-color] focus:border-zinc-900 focus:ring-2 focus:ring-zinc-400/40 disabled:opacity-50';
const triggerClass =
  'flex h-11 items-center justify-between gap-2 rounded-lg border border-zinc-300 bg-white px-3 text-sm text-color-text-default';
const popupClass =
  'z-10 min-w-[var(--anchor-width)] rounded-lg border border-zinc-300 bg-white p-1 shadow-[var(--shadow-200)]';
const itemClass =
  'cursor-default rounded-md px-3 py-2 text-sm text-color-text-default data-[highlighted]:bg-bg-brand-secondary data-[highlighted]:text-color-text-brand';

type Step = 'details' | 'otp' | 'success';

export function TransferFlow() {
  const [step, setStep] = useState<Step>('details');
  const [fromAccountId, setFromAccountId] = useState(mockAccounts[0]?.id ?? '');
  const [toAccountId, setToAccountId] = useState(mockAccounts[1]?.id ?? '');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [preparedTransfer, setPreparedTransfer] = useState<PreparedTransfer | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
  const [resendStatus, setResendStatus] = useState<'idle' | 'loading'>('idle');
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const accountOptions = mockAccounts.map((account) => ({
    label: `${account.label} (${account.maskedNumber})`,
    value: account.id
  }));

  const fromAccount = useMemo(
    () => mockAccounts.find((account) => account.id === fromAccountId),
    [fromAccountId]
  );

  async function handlePrepareTransfer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setResendMessage(null);
    setStatus('submitting');

    const numericAmount = Number(amount.replace(',', '.'));
    const result = await prepareTransferMock({
      fromAccountId,
      toAccountId,
      amount: numericAmount,
      description
    });

    if (!result.ok) {
      setStatus('idle');
      setErrorMessage(result.message);
      return;
    }

    await requestTransferOtpMock();
    setPreparedTransfer(result.transfer);
    setStep('otp');
    setStatus('idle');
  }

  async function handleConfirmTransfer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setStatus('submitting');

    const otpResult = await confirmTransferOtpMock(otpCode);
    if (!otpResult.ok) {
      setStatus('idle');
      setErrorMessage(otpResult.message);
      return;
    }

    setStep('success');
    setStatus('idle');
  }

  async function handleResendOtp() {
    setResendStatus('loading');
    setResendMessage(null);
    await requestTransferOtpMock();
    setResendStatus('idle');
    setResendMessage('Código OTP reenviado (mock).');
  }

  if (step === 'success' && preparedTransfer) {
    return (
      <section className="rounded-2xl bg-bg-secondary p-6 shadow-[var(--shadow-100)]">
        <h2 className="text-2xl font-semibold text-color-text-default">Transferencia exitosa</h2>
        <p className="mt-2 text-color-text-secondary">Tu operación fue confirmada correctamente.</p>
        <dl className="mt-5 space-y-2 text-sm text-color-text-default">
          <div className="flex justify-between gap-4">
            <dt>Número de operación</dt>
            <dd className="font-medium">{preparedTransfer.transferId}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Origen</dt>
            <dd className="font-medium">
              {preparedTransfer.fromAccount.label} ({preparedTransfer.fromAccount.maskedNumber})
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Destino</dt>
            <dd className="font-medium">
              {preparedTransfer.toAccount.label} ({preparedTransfer.toAccount.maskedNumber})
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Monto</dt>
            <dd className="font-medium">${preparedTransfer.amount.toFixed(2)}</dd>
          </div>
          {preparedTransfer.description ? (
            <div className="flex justify-between gap-4">
              <dt>Descripción</dt>
              <dd className="font-medium">{preparedTransfer.description}</dd>
            </div>
          ) : null}
        </dl>
      </section>
    );
  }

  if (step === 'otp' && preparedTransfer) {
    return (
      <section className="space-y-5 rounded-2xl bg-bg-secondary p-6 shadow-[var(--shadow-100)]">
        <header>
          <h2 className="text-xl font-semibold text-color-text-default">Confirma con OTP</h2>
          <p className="mt-2 text-sm text-color-text-secondary">
            Estamos por transferir <strong>${preparedTransfer.amount.toFixed(2)}</strong> de{' '}
            <strong>{preparedTransfer.fromAccount.label}</strong> a{' '}
            <strong>{preparedTransfer.toAccount.label}</strong>.
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleConfirmTransfer}>
          <div className="space-y-2">
            <label htmlFor="transfer-otp" className="text-sm font-medium text-color-text-default">
              Código OTP
            </label>
            <OTPField.Root
              id="transfer-otp"
              length={6}
              name="transfer-otp"
              value={otpCode}
              onValueChange={setOtpCode}
              className="flex flex-wrap items-center gap-2"
              disabled={status === 'submitting'}
            >
              <OTPField.Input aria-label="Dígito 1" className={otpSlotClass} />
              <OTPField.Input aria-label="Dígito 2" className={otpSlotClass} />
              <OTPField.Input aria-label="Dígito 3" className={otpSlotClass} />
              <OTPField.Input aria-label="Dígito 4" className={otpSlotClass} />
              <OTPField.Input aria-label="Dígito 5" className={otpSlotClass} />
              <OTPField.Input aria-label="Dígito 6" className={otpSlotClass} />
            </OTPField.Root>
            <p className="text-xs text-color-text-secondary">
              Demo mock: usa <span className="font-mono">{MOCK_VALID_OTP}</span>.
            </p>
          </div>

          {errorMessage ? (
            <p className="text-sm font-medium text-red-600" role="alert">
              {errorMessage}
            </p>
          ) : null}

          {resendMessage ? (
            <p className="text-sm text-color-text-secondary">{resendMessage}</p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="submit"
              disabled={status === 'submitting' || otpCode.length !== 6}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-bg-brand px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === 'submitting' ? 'Validando...' : 'Confirmar transferencia'}
            </Button>
            <Button
              type="button"
              disabled={resendStatus === 'loading'}
              onClick={handleResendOtp}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-300 px-4 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {resendStatus === 'loading' ? 'Reenviando...' : 'Reenviar OTP'}
            </Button>
          </div>
        </form>
      </section>
    );
  }

  return (
    <section className="rounded-2xl bg-bg-secondary p-6 shadow-[var(--shadow-100)]">
      <h2 className="text-xl font-semibold text-color-text-default">Nueva transferencia</h2>
      <p className="mt-2 text-sm text-color-text-secondary">
        Completa los datos de la operación y validaremos con OTP.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handlePrepareTransfer}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2 text-sm text-color-text-default">
            <Select.Root
              items={accountOptions}
              value={fromAccountId}
              onValueChange={(value) => {
                if (typeof value === 'string') {
                  setFromAccountId(value);
                }
              }}
            >
              <Select.Label>Cuenta de origen</Select.Label>
              <Select.Trigger className={triggerClass}>
                <Select.Value />
                <Select.Icon>
                  <span aria-hidden>▾</span>
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner sideOffset={6}>
                  <Select.Popup className={popupClass}>
                    <Select.List>
                      {mockAccounts.map((account) => (
                        <Select.Item key={account.id} value={account.id} className={itemClass}>
                          <Select.ItemText>
                            {account.label} ({account.maskedNumber}) - ${account.balance.toFixed(2)}
                          </Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.List>
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2 text-sm text-color-text-default">
            <Select.Root
              items={accountOptions}
              value={toAccountId}
              onValueChange={(value) => {
                if (typeof value === 'string') {
                  setToAccountId(value);
                }
              }}
            >
              <Select.Label>Cuenta destino</Select.Label>
              <Select.Trigger className={triggerClass}>
                <Select.Value />
                <Select.Icon>
                  <span aria-hidden>▾</span>
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner sideOffset={6}>
                  <Select.Popup className={popupClass}>
                    <Select.List>
                      {mockAccounts.map((account) => (
                        <Select.Item key={account.id} value={account.id} className={itemClass}>
                          <Select.ItemText>
                            {account.label} ({account.maskedNumber})
                          </Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.List>
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-color-text-default">
            Monto
            <Input
              value={amount}
              onValueChange={setAmount}
              type="number"
              min="0.01"
              step="0.01"
              inputMode="decimal"
              placeholder="0.00"
              className="h-11 rounded-lg border border-zinc-300 bg-white px-3"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-color-text-default">
            Descripción (opcional)
            <Input
              value={description}
              onValueChange={setDescription}
              type="text"
              maxLength={120}
              placeholder="Ej. renta de abril"
              className="h-11 rounded-lg border border-zinc-300 bg-white px-3"
            />
          </label>
        </div>

        <p className="text-xs text-color-text-secondary">
          Saldo disponible en origen: ${fromAccount?.balance.toFixed(2) ?? '0.00'}.
        </p>

        {errorMessage ? (
          <p className="text-sm font-medium text-red-600" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-bg-brand px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === 'submitting' ? 'Preparando...' : 'Continuar y pedir OTP'}
        </Button>
      </form>
    </section>
  );
}
