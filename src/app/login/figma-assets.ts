/**
 * Iconos y logo exportados desde Figma (nodo 36:1533, archivo Pantallas taller SDD).
 * Archivos en /public/brand/figma-login/ — descargados vía MCP; re-exportar si caducan las URLs de Figma.
 */
export const figmaLoginAssets = {
  logo: '/brand/figma-login/logo.svg',
  eye: '/brand/figma-login/eye.svg',
  arrowBracket: '/brand/figma-login/arrow-bracket.svg',
  productMenu: '/brand/figma-login/product-menu.svg',
  chevron: '/brand/figma-login/chevron.svg'
} as const;

/**
 * Tamaños intrínsecos para `next/image` (solo el **ratio** importa con `object-contain`).
 * Ojo: marco original en Figma 300×150; resto según viewBox del SVG exportado.
 */
export const figmaLoginIntrinsicPx = {
  logo: { width: 715, height: 744 },
  eye: { width: 300, height: 150 },
  arrowBracket: { width: 150, height: 131 },
  productMenu: { width: 120, height: 120 },
  chevron: { width: 360, height: 309 }
} as const;

export type FigmaLoginIntrinsicKey = keyof typeof figmaLoginIntrinsicPx;
