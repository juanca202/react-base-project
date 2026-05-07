import Image from 'next/image';

type FigmaResumenIconProps = {
  src: string;
  /** Ancho en px (diseño Figma 36:1699). */
  width: number;
  /** Alto en px. */
  height: number;
  alt?: string;
  className?: string;
};

/**
 * Icono exportado desde Figma: `object-contain` mantiene proporción del viewBox
 * (los SVG del MCP suelen traer `preserveAspectRatio="none"` corregido en repo).
 */
export function FigmaResumenIcon({
  src,
  width,
  height,
  alt = '',
  className = ''
}: FigmaResumenIconProps) {
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
