/**
 * viewBox (ancho × alto) de los SVG en public/figma-perfil — export Figma MCP.
 * `fitBox` en FigmaResumenIcon escala uniformemente para caber en esa caja sin deformar.
 */
export const FIGMA_PERFIL_ICON = {
  arrowLeft: { src: '/figma-perfil/arrow-left.svg', vb: [15, 12.8832] as const },
  arrowRight: { src: '/figma-perfil/arrow-right.svg', vb: [36, 30.8606] as const },
  user: { src: '/figma-perfil/user.svg', vb: [23.6264, 27] as const },
  pencil: { src: '/figma-perfil/pencil.svg', vb: [12, 11.999] as const },
  bell: { src: '/figma-perfil/bell.svg', vb: [10.5006, 12] as const },
  buildingColumns: { src: '/figma-perfil/building-columns.svg', vb: [11.9998, 12] as const },
  shieldCheck: { src: '/figma-perfil/shield-check.svg', vb: [11.2502, 12] as const },
  starSharp: { src: '/figma-perfil/star-sharp.svg', vb: [11.9997, 12] as const },
  sheetPlastic: { src: '/figma-perfil/sheet-plastic.svg', vb: [9, 12] as const },
  fileCheck: { src: '/figma-perfil/file-check.svg', vb: [9, 12] as const },
  phoneFlip: { src: '/figma-perfil/phone-flip.svg', vb: [11.9994, 12] as const },
  logout: { src: '/figma-perfil/logout.svg', vb: [15, 13.1254] as const }
} as const;

export type FigmaPerfilIconKey = keyof typeof FIGMA_PERFIL_ICON;
