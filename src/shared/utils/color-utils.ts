export const DEFAULT_COLORS = [
  '#007bff', // Primary blue
  '#28a745', // Success green
  '#dc3545', // Danger red
  '#ffc107', // Warning yellow
  '#17a2b8', // Info cyan
  '#6f42c1', // Purple
  '#e83e8c', // Pink
  '#fd7e14', // Orange
  '#20c997', // Teal
  '#6c757d', // Gray
] as const;


export function hexToRgba(hex: string, alpha: number): string {
  const cleanHex = hex.replace('#', '');

  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((char) => char + char)
          .join('')
      : cleanHex;

  const r = parseInt(fullHex.substr(0, 2), 16);
  const g = parseInt(fullHex.substr(2, 2), 16);
  const b = parseInt(fullHex.substr(4, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


export function getDefaultColor(index: number, alpha = 1): string {
  const color = DEFAULT_COLORS[index % DEFAULT_COLORS.length];
  return hexToRgba(color, alpha);
}

export function generateColorPalette(count: number, alpha = 1): string[] {
  return Array.from({length: count}, (_, index) =>
    getDefaultColor(index, alpha)
  );
}

export function adjustBrightness(hex: string, factor: number): string {
  const cleanHex = hex.replace('#', '');
  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((char) => char + char)
          .join('')
      : cleanHex;

  const r = parseInt(fullHex.substr(0, 2), 16);
  const g = parseInt(fullHex.substr(2, 2), 16);
  const b = parseInt(fullHex.substr(4, 2), 16);

  const adjust = (color: number) => {
    if (factor > 0) {
      // move towards white
      return Math.round(color + (255 - color) * factor);
    } else {
      // move towards black
      return Math.round(color * (1 + factor));
    }
  };

  const newR = Math.max(0, Math.min(255, adjust(r)));
  const newG = Math.max(0, Math.min(255, adjust(g)));
  const newB = Math.max(0, Math.min(255, adjust(b)));

  return `#${newR.toString(16).padStart(2, '0')}${newG
    .toString(16)
    .padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}


export function createColorVariants(baseColor: string) {
  return {
    base: baseColor,
    hover: adjustBrightness(baseColor, -0.1),
    focus: adjustBrightness(baseColor, -0.15),
    light: adjustBrightness(baseColor, 0.3),
    alpha: (alpha: number) => hexToRgba(baseColor, alpha),
  };
}
