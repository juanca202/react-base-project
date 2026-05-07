import Image from 'next/image';

type FigmaResumenIconBase = {
  src: string;
  alt?: string;
  className?: string;
};

export type FigmaResumenIconProps = FigmaResumenIconBase &
  (
    | { width: number; height: number }
    | {
        /** Lado máximo de la caja cuadrada Figma (p. ej. 16); escala el viewBox con uniform scale. */
        fitBox: number;
        viewBoxWidth: number;
        viewBoxHeight: number;
      }
  );

function dimsForViewBox(viewBoxWidth: number, viewBoxHeight: number, fitBox: number) {
  const scale = Math.min(fitBox / viewBoxWidth, fitBox / viewBoxHeight);
  return {
    width: Math.max(1, Math.round(viewBoxWidth * scale)),
    height: Math.max(1, Math.round(viewBoxHeight * scale))
  };
}

/**
 * Icono exportado desde Figma. Usar `fitBox` + `viewBoxWidth`/`viewBoxHeight` cuando el asset
 * no sea cuadrado, para ceñirse a la caja del diseño sin deformar (junto con `preserveAspectRatio="xMidYMid meet"` en el SVG).
 */
export function FigmaResumenIcon(props: FigmaResumenIconProps) {
  const { src, alt = '', className = '' } = props;
  let width: number;
  let height: number;
  if ('fitBox' in props) {
    const { fitBox, viewBoxWidth, viewBoxHeight } = props;
    ({ width, height } = dimsForViewBox(viewBoxWidth, viewBoxHeight, fitBox));
  } else {
    width = props.width;
    height = props.height;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      className={`block shrink-0 object-contain object-center ${className}`}
      style={{ width, height }}
    />
  );
}
