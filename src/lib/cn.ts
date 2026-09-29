import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Tokens propios de tailwind.config.js. Sin registrarlos, tailwind-merge toma
// text-body (tamaño) y text-text-soft (color) como del mismo grupo y borra el
// tamaño. Un test (cn.test.ts) revisa que sigan iguales al config.
export const FONT_SIZES = ['display', 'title', 'body-lg', 'body', 'caption', 'label', 'tab', 'folio'];
export const COLORS = [
  'bg',
  'surface-1',
  'surface-2',
  'border',
  'text',
  'text-soft',
  'text-mute',
  'text-disabled',
  'brand',
  'brand-soft',
  'ink',
  'success',
  'danger',
  'warning',
  'info',
  'brand-tint',
  'success-tint',
  'danger-tint',
  'warning-tint',
  'info-tint',
];
export const RADII = ['sm', 'md', 'sheet', 'pill'];

const merge = extendTailwindMerge({
  extend: {
    theme: { colors: COLORS, borderRadius: RADII },
    classGroups: { 'font-size': [{ text: FONT_SIZES }] },
  },
});

// Clases de NativeWind con condiciones: clsx arma la lista (cadenas, objetos,
// arreglos; false/undefined se ignoran) y merge resuelve choques, así que la
// última gana (cn('px-4', 'px-5') → 'px-5').
export function cn(...inputs: ClassValue[]): string {
  return merge(clsx(inputs));
}
