'use client';

import { FigmaResumenIcon } from '@/features/landing/ui/figma-resumen-icon';
import {
  FIGMA_PERFIL_ICON,
  type FigmaPerfilIconKey
} from '@/features/settings/lib/figma-perfil-viewbox';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

export type SettingsPerfilViewProps = {
  displayName: string;
  lastConnectionLabel: string;
  onLogout: () => void;
};

const BG_STYLE: CSSProperties = {
  backgroundImage: 'linear-gradient(180deg, #f2f3f7 0%, #f2f3f7 49.038%, #d0f0f6 100%)'
};

/** Icono alineado a la caja Figma (16 / 20 / 36 px) respetando el viewBox del SVG. */
function PerfilGlyph({
  def,
  box,
  className = ''
}: {
  def: (typeof FIGMA_PERFIL_ICON)[FigmaPerfilIconKey];
  box: number;
  className?: string;
}) {
  return (
    <FigmaResumenIcon
      src={def.src}
      fitBox={box}
      viewBoxWidth={def.vb[0]}
      viewBoxHeight={def.vb[1]}
      alt=""
      className={className}
    />
  );
}

const ROW_ICON_BOX = 16;
const CHEVRON_BOX = 16;
const BACK_ICON_BOX = 20;
const PENCIL_BOX = 16;
const USER_AVATAR_BOX = 36;
const LOGOUT_ICON_BOX = 20;

function MenuRowLink({
  iconKey,
  label,
  href
}: {
  iconKey: FigmaPerfilIconKey;
  label: string;
  href: string;
}) {
  const icon = FIGMA_PERFIL_ICON[iconKey];
  return (
    <li className="border-b border-[#f2f2f2] last:border-b-0">
      <Link
        href={href}
        className="flex w-full items-center gap-3 bg-white px-3 py-3 no-underline outline-none hover:bg-[#fafafa] focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-inset"
      >
        <span className="inline-flex size-4 shrink-0 items-center justify-center" aria-hidden>
          <PerfilGlyph def={icon} box={ROW_ICON_BOX} />
        </span>
        <span className="min-w-0 flex-1 text-left text-[12px] font-semibold leading-5 text-[#757575]">
          {label}
        </span>
        <span className="inline-flex size-4 shrink-0 items-center justify-center" aria-hidden>
          <PerfilGlyph def={FIGMA_PERFIL_ICON.arrowRight} box={CHEVRON_BOX} className="shrink-0" />
        </span>
      </Link>
    </li>
  );
}

function MenuRowButton({
  iconKey,
  label,
  onClick
}: {
  iconKey: FigmaPerfilIconKey;
  label: string;
  onClick?: () => void;
}) {
  const icon = FIGMA_PERFIL_ICON[iconKey];
  return (
    <li className="border-b border-[#f2f2f2] last:border-b-0">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full cursor-default items-center gap-3 bg-white px-3 py-3 text-left outline-none hover:bg-[#fafafa] focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-inset"
      >
        <span className="inline-flex size-4 shrink-0 items-center justify-center" aria-hidden>
          <PerfilGlyph def={icon} box={ROW_ICON_BOX} />
        </span>
        <span className="min-w-0 flex-1 text-[12px] font-semibold leading-5 text-[#757575]">
          {label}
        </span>
        <span className="inline-flex size-4 shrink-0 items-center justify-center" aria-hidden>
          <PerfilGlyph def={FIGMA_PERFIL_ICON.arrowRight} box={CHEVRON_BOX} className="shrink-0" />
        </span>
      </button>
    </li>
  );
}

function SectionBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-3">
      <h2 className="m-0 text-[14px] font-normal leading-normal text-[#1a1a1a]">{title}</h2>
      <ul className="m-0 list-none overflow-hidden rounded-lg bg-white p-0">{children}</ul>
    </div>
  );
}

/**
 * Pantalla Perfil — fidelidad al frame Figma 36:1639 (Pantallas taller SDD).
 * @see https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=36-1639
 */
export function SettingsPerfilView({
  displayName,
  lastConnectionLabel,
  onLogout
}: SettingsPerfilViewProps) {
  return (
    <main className="min-h-screen w-full" style={BG_STYLE}>
      <div className="mx-auto w-full max-w-[360px] px-6 pb-12 pt-[58px]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-4">
            <Link
              href="/resumen"
              className="inline-flex h-[22px] w-5 items-center justify-start outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2"
              aria-label="Volver al inicio"
            >
              <PerfilGlyph def={FIGMA_PERFIL_ICON.arrowLeft} box={BACK_ICON_BOX} />
            </Link>
            <h1 className="m-0 text-[18px] font-normal leading-7 text-[#1a1a1a]">PERFIL</h1>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative rounded-[12px] bg-white px-4 py-4">
              <button
                type="button"
                className="absolute right-4 top-4 flex items-start rounded bg-[#d0f0f6] p-1 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                aria-label="Editar perfil"
              >
                <PerfilGlyph def={FIGMA_PERFIL_ICON.pencil} box={PENCIL_BOX} />
              </button>

              <div className="mx-auto flex w-full max-w-[170px] flex-col items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#94e0ed]">
                  <PerfilGlyph def={FIGMA_PERFIL_ICON.user} box={USER_AVATAR_BOX} />
                </div>
                <div className="w-full text-center">
                  <p className="m-0 text-[16px] font-semibold leading-6 text-[#1a1a1a]">
                    {displayName}
                  </p>
                  <p className="m-0 mt-0.5 text-[10px] font-normal leading-5 text-[#008292]">
                    {lastConnectionLabel}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <SectionBlock title="Información">
                <MenuRowButton iconKey="bell" label="Notificaciones" />
                <MenuRowLink iconKey="buildingColumns" label="Cuentas" href="/resumen" />
                <MenuRowButton iconKey="shieldCheck" label="Seguridad" />
              </SectionBlock>

              <SectionBlock title="General">
                <MenuRowButton iconKey="starSharp" label="Califícanos" />
                <MenuRowLink
                  iconKey="sheetPlastic"
                  label="Política de privacidad"
                  href="/privacy"
                />
                <MenuRowLink iconKey="fileCheck" label="Términos y condiciones" href="/terms" />
                <MenuRowLink
                  iconKey="phoneFlip"
                  label="Contáctanos"
                  href="mailto:soporte@example.com"
                />
              </SectionBlock>

              <button
                type="button"
                onClick={() => void onLogout()}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-2 shadow-[0px_4px_4px_0px_#e2e2e2] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2"
              >
                <span className="text-[14px] font-semibold leading-[22px] text-[#008292]">
                  Cerrar sesión
                </span>
                <span className="inline-flex rotate-180" aria-hidden>
                  <PerfilGlyph def={FIGMA_PERFIL_ICON.logout} box={LOGOUT_ICON_BOX} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
