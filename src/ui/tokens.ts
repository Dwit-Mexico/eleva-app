// Tokens del rediseño (handoff "Rediseño Eleva Customer Service"). Son la
// única fuente de color: las pantallas usan clases semánticas (bg-bg,
// text-text-soft…) o, donde NativeWind no llega (íconos, tab bar), estos
// valores. Nunca un hex directo en una pantalla.

export type ThemeName = 'dark' | 'cream';

export type Palette = {
  bg: string;
  surface1: string;
  surface2: string;
  border: string;
  text: string;
  textSoft: string;
  textMute: string;
  textDisabled: string;
  brand: string;
  brandSoft: string;
  ink: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
};

export const palettes: Record<ThemeName, Palette> = {
  dark: {
    bg: '#18191A',
    surface1: '#232628',
    surface2: '#2A2D2F',
    border: '#3A3D40',
    text: '#F5F5F4',
    textSoft: '#A8ABAD',
    textMute: '#94989A',
    textDisabled: '#4A4D50',
    brand: '#B29360',
    brandSoft: '#C9A96E',
    ink: '#18191A',
    success: '#4ADE80',
    danger: '#F87171',
    warning: '#FBBF24',
    info: '#60A5FA',
  },
  cream: {
    bg: '#F0EAE0',
    surface1: '#FAF6EE',
    surface2: '#FFFDF8',
    border: '#DCD3C2',
    text: '#211E19',
    textSoft: '#574F44',
    textMute: '#7B7365',
    textDisabled: '#B6AE9F',
    brand: '#B29360',
    brandSoft: '#7A5D27',
    ink: '#211E19',
    success: '#63C089',
    danger: '#E2685F',
    warning: '#E9A825',
    info: '#4E8FD8',
  },
};

// Opacidad de los fondos de aviso (*-tint): 12–14 % en oscuro, 16–18 % en crema.
export const tintAlpha: Record<ThemeName, number> = { dark: 0.13, cream: 0.17 };

export const radius = { sm: 8, md: 12, sheet: 20, pill: 999 } as const;
export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40 } as const;
export const screenPadding = 20;
export const touch = { min: 44, primary: 52, secondary: 44 } as const;

// "#RRGGBB" → "R G B" para las variables CSS de NativeWind.
export function rgbTriplet(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

export function withAlpha(hex: string, alpha: number): string {
  const [r, g, b] = rgbTriplet(hex).split(' ');
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
