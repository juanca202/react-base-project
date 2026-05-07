'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import { ResumenBottomNav } from '@/features/landing/ui/resumen-bottom-nav';
import { FigmaResumenIcon } from '@/features/landing/ui/figma-resumen-icon';
import {
  DEMO_ROUTER_NUMBER,
  TRANSFER_DEMO_ACCOUNTS,
  findDemoAccountByNumber
} from '@/features/transferencias/mock/demo-accounts';
import type {
  TransferFlowData,
  TransferFlowStep,
  TransferFormDraft
} from '@/features/transferencias/types/transfer-flow';
import { TransferAccountPickerModal } from '@/features/transferencias/ui/transfer-account-picker-modal';
import { formatCurrencyEs, formatReceiptDate } from '@/features/transferencias/ui/transfer-format';

const INITIAL_FLOW_DATA: TransferFlowData = {
  transferType: null,
  formDraft: null,
  operationId: null
};

const SELECTOR_BG =
  'linear-gradient(180deg, rgb(242, 243, 247) 0%, rgb(242, 243, 247) 49.038%, rgb(208, 240, 246) 100%)';
const FORM_BG =
  'linear-gradient(180deg, rgb(173, 206, 229) 0%, rgb(242, 243, 247) 49.038%, rgb(242, 243, 247) 100%)';

function hasSelectorPrerequisites(data: TransferFlowData): boolean {
  return data.transferType !== null;
}

function hasFormularioPrerequisites(
  data: TransferFlowData
): data is TransferFlowData & { formDraft: TransferFormDraft } {
  return data.formDraft !== null;
}

function hasExitoPrerequisites(data: TransferFlowData): boolean {
  return data.operationId !== null;
}

function resolveSafeStep(
  requestedStep: TransferFlowStep,
  data: TransferFlowData
): TransferFlowStep {
  if (requestedStep === 'exito' && hasExitoPrerequisites(data)) return 'exito';
  if (requestedStep === 'verificacion' && hasFormularioPrerequisites(data)) return 'verificacion';
  if (requestedStep === 'formulario' && hasSelectorPrerequisites(data)) return 'formulario';
  return 'selector';
}

function parseAmountInput(raw: string): number {
  const cleaned = raw.replace(/[^\d.,]/g, '').replace(',', '.');
  if (!cleaned) return NaN;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : NaN;
}

function formatAmountDraft(n: number): string {
  return n.toLocaleString('es-EC', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function IconChevronRight({ className }: { className?: string }) {
  return (
    <FigmaResumenIcon
      src="/figma-perfil/arrow-right.svg"
      width={16}
      height={16}
      className={className}
      alt=""
    />
  );
}

function IconArrowRightOnBrand() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0" aria-hidden>
      <path
        d="M7.5 4.5L12.5 9.5L7.5 14.5"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShare() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0" aria-hidden>
      <circle cx="5" cy="10" r="2" fill="white" />
      <circle cx="15" cy="5" r="2" fill="white" />
      <circle cx="15" cy="15" r="2" fill="white" />
      <path d="M6.5 9L13.5 5.5M6.5 11L13.5 14.5" stroke="white" strokeWidth="1.2" />
    </svg>
  );
}

type SelectorStageProps = {
  onContinue: (typeId: string) => void;
};

function SelectorStage({ onContinue }: SelectorStageProps) {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col pb-28"
      style={{ background: SELECTOR_BG }}
    >
      <div className="flex w-full flex-col gap-400 px-300 pt-[57px]">
        <div className="flex flex-col gap-[15px]">
          <Link
            href="/resumen"
            className="flex h-[22px] w-5 shrink-0"
            aria-label="Volver al resumen"
          >
            <FigmaResumenIcon src="/figma-perfil/arrow-left.svg" width={20} height={20} alt="" />
          </Link>
          <h1 className="m-0 text-[18px] font-normal leading-7 text-[#1a1a1a]">TRANSFERENCIAS</h1>
        </div>
        <div className="flex flex-col gap-400">
          <p className="m-0 text-[16px] font-normal leading-6 text-[#474747]">
            Transferir mi dinero
          </p>
          <div className="flex flex-col gap-300">
            <button
              type="button"
              onClick={() => onContinue('entre-mis-cuentas')}
              className="flex w-full items-start gap-400 rounded-[12px] bg-white p-400 text-left shadow-[0_1px_3px_rgb(0_0_0_/0.06)]"
            >
              <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[8px] bg-[#d0f0f6]">
                <FigmaResumenIcon
                  src="/figma-resumen/icon-transfer.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-between gap-200">
                <div className="min-w-0">
                  <p className="m-0 text-[16px] font-semibold leading-6 text-black">
                    Entre mis cuentas
                  </p>
                  <p className="m-0 mt-100 text-[14px] font-normal leading-normal text-[#3e494b]">
                    Transfiere dinero de forma inmediata.
                  </p>
                </div>
                <IconChevronRight className="shrink-0 opacity-80" />
              </div>
            </button>
            <div
              className="flex w-full cursor-not-allowed items-start gap-400 rounded-[12px] bg-white p-400 opacity-50 shadow-[0_1px_3px_rgb(0_0_0_/0.06)]"
              aria-disabled="true"
            >
              <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[8px] bg-[#d0f0f6]">
                <FigmaResumenIcon
                  src="/figma-resumen/icon-user.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-between gap-200">
                <div className="min-w-0">
                  <p className="m-0 text-[16px] font-semibold leading-6 text-black">A terceros</p>
                  <p className="m-0 mt-100 text-[14px] font-normal leading-normal text-[#3e494b]">
                    Transfiere dinero a otros beneficiarios.
                  </p>
                </div>
                <IconChevronRight className="shrink-0 opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResumenBottomNav />
    </div>
  );
}

type FormularioStageProps = {
  transferType: string;
  draft: TransferFormDraft | null;
  modalTitleId: string;
  onBack: () => void;
  onCancel: () => void;
  onContinue: (draft: TransferFormDraft) => void;
};

function FormularioStage({
  transferType: _transferType,
  draft,
  modalTitleId,
  onBack,
  onCancel,
  onContinue
}: FormularioStageProps) {
  void _transferType;
  const [sourceNumber, setSourceNumber] = useState(draft?.sourceAccountNumber ?? '4489203829');
  const [targetNumber, setTargetNumber] = useState(draft?.targetAccountNumber ?? '4489203356');
  const [amountInput, setAmountInput] = useState(() =>
    draft ? formatAmountDraft(draft.amount) : ''
  );
  const [description, setDescription] = useState(draft?.description ?? '');
  const [picker, setPicker] = useState<null | 'source' | 'target'>(null);
  const [error, setError] = useState<string | null>(null);

  const sourceAcc = findDemoAccountByNumber(sourceNumber);
  const targetAcc = findDemoAccountByNumber(targetNumber);

  const validateAndSubmit = () => {
    const amount = parseAmountInput(amountInput);
    if (!sourceAcc || !targetAcc) {
      setError('Selecciona cuentas válidas.');
      return;
    }
    if (sourceNumber === targetNumber) {
      setError('La cuenta origen y destino no pueden ser la misma.');
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Ingresa un monto mayor que cero.');
      return;
    }
    if (amount > sourceAcc.balance) {
      setError('El monto no puede superar el saldo disponible de la cuenta origen.');
      return;
    }
    setError(null);
    onContinue({
      sourceAccountNumber: sourceNumber,
      targetAccountNumber: targetNumber,
      routerNumber: DEMO_ROUTER_NUMBER,
      amount,
      description: description.trim()
    });
  };

  return (
    <div
      className="relative flex min-h-screen w-full flex-col pb-600"
      style={{ background: FORM_BG }}
    >
      <div className="flex w-full flex-col items-center gap-600 px-300 pt-[57px]">
        <div className="flex w-full max-w-[312px] flex-col gap-1200">
          <div className="flex flex-col gap-500">
            <div className="flex flex-col gap-[15px]">
              <button
                type="button"
                onClick={onBack}
                className="flex h-[22px] w-5 shrink-0"
                aria-label="Volver"
              >
                <FigmaResumenIcon
                  src="/figma-perfil/arrow-left.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </button>
              <h1 className="m-0 text-[18px] font-normal leading-7 text-[#1a1a1a]">TRANSFERIR</h1>
            </div>

            <div className="flex w-full flex-col items-center gap-500">
              <div className="relative w-full">
                <div className="flex w-full flex-col gap-600">
                  <button
                    type="button"
                    onClick={() => setPicker('source')}
                    className="flex h-[74px] w-full items-center gap-400 rounded-[12px] bg-white px-300 py-400 text-left"
                  >
                    <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px] bg-[#d0f0f6]">
                      <FigmaResumenIcon
                        src="/figma-transfer/wallet.svg"
                        width={16}
                        height={16}
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="m-0 text-[12px] leading-5 text-[#757575]">Desde</p>
                      <p className="m-0 text-[14px] font-normal leading-normal text-[#474747]">
                        {sourceAcc?.displayName ?? '—'}
                      </p>
                      <p className="m-0 text-[12px] leading-5 text-[#757575]">
                        {sourceAcc?.detailLine ?? sourceNumber}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-300">
                      <span className="text-[12px] font-semibold text-[#474747]">
                        {sourceAcc ? formatCurrencyEs(sourceAcc.balance) : '—'}
                      </span>
                      <IconChevronRight />
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPicker('target')}
                    className="flex h-[74px] w-full items-center gap-400 rounded-[12px] bg-white px-300 py-400 text-left"
                  >
                    <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px] bg-[#d0f0f6]">
                      <FigmaResumenIcon
                        src="/figma-transfer/wallet.svg"
                        width={16}
                        height={16}
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="m-0 text-[12px] leading-5 text-[#757575]">Hacia</p>
                      <p className="m-0 text-[14px] font-normal leading-normal text-[#474747]">
                        {targetAcc?.displayName ?? '—'}
                      </p>
                      <p className="m-0 text-[12px] leading-5 text-[#757575]">
                        {targetAcc?.detailLine ?? targetNumber}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-300">
                      <span className="text-[12px] font-semibold text-[#474747]">
                        {targetAcc ? formatCurrencyEs(targetAcc.balance) : '—'}
                      </span>
                      <IconChevronRight />
                    </div>
                  </button>
                </div>
                <div className="pointer-events-none absolute left-1/2 top-[67px] z-10 flex h-[40px] w-[40px] -translate-x-1/2 items-center justify-center rounded-[28px] bg-[#d0f0f6]">
                  <FigmaResumenIcon
                    src="/figma-transfer/angles-down.svg"
                    fitBox={24}
                    viewBoxWidth={16.615}
                    viewBoxHeight={18}
                    alt=""
                  />
                </div>
              </div>

              <div className="flex w-full flex-col gap-300">
                <p className="m-0 text-center text-[16px] font-normal leading-6 text-[#474747]">
                  Ingresa el monto a transferir
                </p>
                <div className="relative h-[86px] w-full">
                  <label className="sr-only" htmlFor="transfer-amount-input">
                    Monto a transferir
                  </label>
                  <div className="absolute left-1/2 top-[2px] flex h-[84px] w-[calc(100%-24px)] max-w-[300px] -translate-x-1/2 flex-col border-b border-[var(--color-bg-brand)] px-300 py-200">
                    <input
                      id="transfer-amount-input"
                      inputMode="decimal"
                      autoComplete="off"
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                      className="m-0 w-full border-0 bg-transparent p-0 text-center text-[50px] font-normal leading-[60px] text-[#1a1c1c] outline-none focus:ring-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full max-w-[312px] flex-col items-center gap-600">
            <div className="flex w-full flex-col gap-200">
              <p className="m-0 text-[12px] leading-5 text-[#3e494b]">
                <span className="font-semibold">Concepto</span>{' '}
                <span className="font-normal text-[#757575]">(Opcional)</span>
              </p>
              <div className="flex w-full items-start rounded-[8px] border border-white bg-white px-400 py-[17px]">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ej. Pago zapatos"
                  className="m-0 w-full border-0 bg-transparent text-[14px] text-[#1a1c1c] placeholder:text-[#c8c8c8] outline-none focus:ring-0"
                />
              </div>
            </div>

            {error ? (
              <p
                className="m-0 w-full text-[14px] text-[var(--color-text-input-error)]"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <button
              type="button"
              onClick={validateAndSubmit}
              className="flex h-[48px] w-[308px] max-w-full items-center justify-center gap-300 rounded-[8px] bg-[var(--color-bg-brand)] px-400 py-400"
            >
              <span className="text-[14px] font-semibold leading-[22px] text-white">Continuar</span>
              <IconArrowRightOnBrand />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="mt-200 text-[14px] font-semibold leading-[22px] text-[var(--color-bg-brand)]"
        >
          Cancelar
        </button>
      </div>

      <TransferAccountPickerModal
        open={picker !== null}
        titleId={modalTitleId}
        accounts={TRANSFER_DEMO_ACCOUNTS}
        selectedAccountNumber={
          picker === 'source' ? sourceNumber : picker === 'target' ? targetNumber : null
        }
        onClose={() => setPicker(null)}
        onSelect={(num) => {
          if (picker === 'source') setSourceNumber(num);
          if (picker === 'target') setTargetNumber(num);
        }}
      />
    </div>
  );
}

type VerificacionStageProps = {
  draft: TransferFormDraft;
  onBack: () => void;
  onCancel: () => void;
  onConfirm: () => void;
};

function VerificacionStage({ draft, onBack, onCancel, onConfirm }: VerificacionStageProps) {
  const source = findDemoAccountByNumber(draft.sourceAccountNumber);
  const target = findDemoAccountByNumber(draft.targetAccountNumber);
  const conceptLabel = draft.description.trim() || 'Sin concepto';

  return (
    <div className="relative min-h-screen w-full bg-[#f2f3f7] pb-600">
      <div className="mx-auto flex w-full max-w-[360px] flex-col px-300 pt-[57px]">
        <div className="flex flex-col gap-[15px]">
          <button
            type="button"
            onClick={onBack}
            className="flex h-[22px] w-5 shrink-0"
            aria-label="Volver"
          >
            <FigmaResumenIcon src="/figma-perfil/arrow-left.svg" width={20} height={20} alt="" />
          </button>
          <h1 className="m-0 text-[18px] font-normal leading-7 text-[#1a1a1a]">
            REVISAR TRANSFERENCIA
          </h1>
        </div>

        <div className="mt-600 flex w-full flex-col items-center gap-600 px-0 pt-600">
          <div className="flex w-[312px] max-w-full flex-col gap-300 rounded-[12px] bg-white p-300">
            <p className="m-0 text-center text-[12px] font-semibold leading-5 text-[#3e494b]">
              Monto a enviar
            </p>
            <div className="flex h-[39px] w-full items-start justify-center">
              <p className="m-0 text-center text-[50px] font-normal leading-[60px] text-[#1a1c1c]">
                {formatCurrencyEs(draft.amount)}
              </p>
            </div>
            <div className="flex w-full items-center justify-center rounded-[12px] bg-[#d0f0f6] px-100 py-050">
              <p className="m-0 text-[12px] leading-5 text-[#474747]">
                La transferencia se realizará de inmediato
              </p>
            </div>

            <div className="flex w-full flex-col gap-300">
              <div className="flex w-full items-center gap-400 rounded-br-[12px] rounded-tr-[12px] bg-white py-400 pl-300 pr-300">
                <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px] bg-[#d0f0f6]">
                  <FigmaResumenIcon
                    src="/figma-transfer/wallet.svg"
                    width={16}
                    height={16}
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-[12px] leading-5 text-[#757575]">Desde</p>
                  <p className="m-0 text-[14px] font-normal leading-normal text-[#474747]">
                    {source?.displayName ?? draft.sourceAccountNumber}
                  </p>
                  <p className="m-0 text-[12px] leading-5 text-[#757575]">
                    {source?.maskedLine ?? `Cta. ${draft.sourceAccountNumber}`}
                  </p>
                </div>
                <p className="m-0 shrink-0 text-[12px] font-semibold text-[#474747]">
                  {source ? formatCurrencyEs(source.balance) : '—'}
                </p>
              </div>

              <div className="flex w-full items-center gap-400 rounded-[12px] bg-white py-400 pl-300 pr-300">
                <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px] bg-[#d0f0f6]">
                  <FigmaResumenIcon
                    src="/figma-transfer/wallet.svg"
                    width={16}
                    height={16}
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-[12px] leading-5 text-[#474747]">Hacia</p>
                  <p className="m-0 text-[14px] font-normal leading-normal text-[#474747]">
                    {target?.displayName ?? draft.targetAccountNumber}
                  </p>
                  <p className="m-0 text-[12px] leading-5 text-[#757575]">
                    {target?.maskedLine ?? `Cta. ${draft.targetAccountNumber}`}
                  </p>
                </div>
                <p className="m-0 shrink-0 text-[12px] font-semibold text-[#474747]">
                  {target ? formatCurrencyEs(target.balance) : '—'}
                </p>
              </div>
            </div>

            <div className="flex w-full items-center justify-between border-b border-[#eee] px-100 pb-[13px] pt-300">
              <span className="text-[14px] text-[#474747]">Concepto</span>
              <span className="text-[12px] text-[var(--color-bg-brand)]">{conceptLabel}</span>
            </div>
            <div className="flex w-full items-center justify-between border-b border-[#eee] px-100 pb-[13px] pt-300">
              <span className="text-[14px] text-[#474747]">Comisión</span>
              <span className="text-[12px] text-[var(--color-bg-brand)]">
                {formatCurrencyEs(0)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onConfirm}
            className="flex h-[48px] w-full max-w-[312px] items-center justify-center gap-300 rounded-[8px] bg-[var(--color-bg-brand)] px-400 py-400"
          >
            <span className="text-[14px] font-semibold leading-[22px] text-white">Transferir</span>
            <IconArrowRightOnBrand />
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="py-200 text-[14px] font-semibold leading-[22px] text-[var(--color-bg-brand)]"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

type ExitoStageProps = {
  operationId: string;
  receiptAt: Date;
  draft: TransferFormDraft;
  onRestart: () => void;
};

function ExitoStage({ operationId, receiptAt, draft, onRestart }: ExitoStageProps) {
  const source = findDemoAccountByNumber(draft.sourceAccountNumber);
  const target = findDemoAccountByNumber(draft.targetAccountNumber);
  const conceptLabel = draft.description.trim() || 'Sin concepto';
  const receiptDigits = operationId.replace(/\D/g, '').slice(-10) || operationId;

  const share = async () => {
    try {
      await navigator.share({
        title: 'Comprobante',
        text: `Comprobante ${receiptDigits} — ${formatCurrencyEs(draft.amount)}`
      });
    } catch {
      /* cancelado o no disponible */
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f2f3f7] pb-600">
      <div className="mx-auto flex w-full max-w-[360px] flex-col gap-600 px-300 pt-[44px]">
        <h1 className="m-0 text-[18px] font-normal leading-7 text-[#1a1a1a]">COMPROBANTE</h1>

        <div className="relative w-full overflow-hidden rounded-[12px] bg-white shadow-[0_8px_16px_rgb(0_0_0_/0.02)]">
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[12px]"
            aria-hidden
          >
            <div
              className="absolute left-1/2 top-1/2 h-[220%] w-[220%] opacity-[0.14]"
              style={{
                backgroundImage: 'url(/figma-transfer/comprobante-watermark-tile.png)',
                backgroundRepeat: 'repeat',
                backgroundSize: '200px auto',
                transform: 'translate(-50%, -50%) rotate(-30deg)'
              }}
            />
          </div>

          <div className="relative z-[1] flex flex-col items-center gap-200 px-300 pb-400 pt-500">
            <div className="relative h-[20px] w-[118px]">
              <Image
                src="/figma-login/logo.svg"
                alt=""
                width={118}
                height={20}
                className="h-[20px] w-auto object-contain object-left"
                unoptimized
              />
            </div>
            <div className="flex size-[52px] items-center justify-center rounded-full border border-[#d6d6d6] bg-white shadow-[0_0.5px_0.5px_rgb(0_0_0_/0.05)]">
              <span className="text-[22px] font-semibold leading-none text-[var(--color-bg-brand)]">
                ✓
              </span>
            </div>
            <p className="m-0 text-[12px] leading-5 text-[var(--color-bg-brand)]">
              ¡Transferencia exitosa!
            </p>
            <p className="m-0 text-[18px] font-normal leading-7 text-[#1a1c1c]">
              {formatCurrencyEs(draft.amount)}
            </p>
            <p className="m-0 text-[8px] leading-5 text-[#3e494b]">Comprobante {receiptDigits}</p>
            <p className="m-0 text-[10px] leading-5 text-[#3e494b]">
              {formatReceiptDate(receiptAt)}
            </p>
          </div>

          <div className="relative z-[1] flex flex-col gap-200 border-t border-[#e2e2e2] px-0 pb-500">
            <div className="flex w-full items-center gap-400 px-300 py-400">
              <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px] bg-[#d0f0f6]">
                <FigmaResumenIcon src="/figma-transfer/wallet.svg" width={16} height={16} alt="" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[12px] text-[#474747]">Desde</p>
                <p className="m-0 text-[14px] text-[#474747]">
                  {source?.displayName ?? draft.sourceAccountNumber}
                </p>
                <p className="m-0 text-[12px] text-[#757575]">
                  {source?.maskedLine ?? `Cta. ${draft.sourceAccountNumber}`}
                </p>
              </div>
            </div>
            <div className="flex w-full items-center gap-400 border-t border-[#e2e2e2] px-300 py-400">
              <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px] bg-[#d0f0f6]">
                <FigmaResumenIcon
                  src="/figma-resumen/icon-user.svg"
                  width={16}
                  height={16}
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[12px] text-[#474747]">Hacia</p>
                <p className="m-0 text-[14px] text-[#474747]">
                  {target?.displayName ?? draft.targetAccountNumber}
                </p>
                <p className="m-0 text-[12px] text-[#757575]">
                  {target?.maskedLine ?? `Cta. ${draft.targetAccountNumber}`}
                </p>
              </div>
            </div>
            <div className="flex w-full items-center justify-between border-t border-[#e2e2e2] px-400 py-300">
              <span className="text-[14px] text-[#474747]">Concepto</span>
              <span className="text-[12px] text-[var(--color-bg-brand)]">{conceptLabel}</span>
            </div>
            <div className="flex w-full items-center justify-between px-400 py-300">
              <span className="text-[14px] text-[#474747]">Comisión</span>
              <span className="text-[12px] text-[var(--color-bg-brand)]">
                {formatCurrencyEs(0)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-300">
          <button
            type="button"
            onClick={() => void share()}
            className="flex h-[48px] w-full items-center justify-center gap-300 rounded-[8px] bg-[var(--color-bg-brand)] px-400 py-400"
          >
            <span className="text-[14px] font-semibold leading-[22px] text-white">Compartir</span>
            <IconShare />
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="flex h-[48px] w-full items-center justify-center rounded-[8px] border border-[var(--color-bg-brand)] bg-white px-400 py-400 shadow-[0_4px_4px_#e2e2e2]"
          >
            <span className="text-[14px] font-semibold leading-[22px] text-[var(--color-bg-brand)]">
              Nueva transferencia
            </span>
          </button>
          <Link
            href="/resumen"
            className="flex h-[48px] w-full items-center justify-center rounded-[8px] px-400 py-400 text-[14px] font-semibold leading-[22px] text-[var(--color-bg-brand)] shadow-[0_4px_2px_#e2e2e2]"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export function TransferenciasFlow() {
  const modalTitleId = useId();
  const [step, setStep] = useState<TransferFlowStep>('selector');
  const [data, setData] = useState<TransferFlowData>(INITIAL_FLOW_DATA);
  const [receiptAt, setReceiptAt] = useState<Date | null>(null);

  const safeStep = useMemo(() => resolveSafeStep(step, data), [step, data]);

  const goToStep = (nextStep: TransferFlowStep) => {
    setStep(resolveSafeStep(nextStep, data));
  };

  const handleSelectType = (typeId: string) => {
    setData({ transferType: typeId, formDraft: null, operationId: null });
    setReceiptAt(null);
    setStep('formulario');
  };

  const handleSubmitForm = (draft: TransferFormDraft) => {
    if (!hasSelectorPrerequisites(data)) {
      setStep('selector');
      return;
    }
    setData((previous) => ({ ...previous, formDraft: draft, operationId: null }));
    setStep('verificacion');
  };

  const handleConfirmTransfer = () => {
    if (!hasFormularioPrerequisites(data)) {
      setStep('selector');
      return;
    }
    const id = String(Math.floor(1_000_000_000 + Math.random() * 9_000_000_000));
    setData((previous) => ({ ...previous, operationId: id }));
    setReceiptAt(new Date());
    setStep('exito');
  };

  const handleCancel = () => {
    setData(INITIAL_FLOW_DATA);
    setReceiptAt(null);
    setStep('selector');
  };

  const handleBack = () => {
    if (safeStep === 'verificacion') {
      goToStep('formulario');
      return;
    }
    if (safeStep === 'formulario') {
      goToStep('selector');
    }
  };

  const handleRestart = () => {
    setData(INITIAL_FLOW_DATA);
    setReceiptAt(null);
    setStep('selector');
  };

  return (
    <main className="min-h-screen w-full">
      {safeStep === 'selector' && <SelectorStage onContinue={handleSelectType} />}

      {safeStep === 'formulario' && data.transferType && (
        <FormularioStage
          transferType={data.transferType}
          draft={data.formDraft}
          modalTitleId={modalTitleId}
          onBack={handleBack}
          onCancel={handleCancel}
          onContinue={handleSubmitForm}
        />
      )}

      {safeStep === 'verificacion' && data.formDraft && (
        <VerificacionStage
          draft={data.formDraft}
          onBack={handleBack}
          onCancel={handleCancel}
          onConfirm={handleConfirmTransfer}
        />
      )}

      {safeStep === 'exito' && data.operationId && data.formDraft && receiptAt && (
        <ExitoStage
          operationId={data.operationId}
          receiptAt={receiptAt}
          draft={data.formDraft}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
}
