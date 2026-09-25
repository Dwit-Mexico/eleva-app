import { vars } from 'nativewind';

import { palettes, rgbTriplet, tintAlpha, type Palette, type ThemeName } from './tokens';

// Variables CSS por tema: tailwind.config.js las lee como rgb(var(--x)).
const keys: Record<keyof Palette, string> = {
  bg: '--bg',
  surface1: '--surface-1',
  surface2: '--surface-2',
  border: '--border',
  text: '--text',
  textSoft: '--text-soft',
  textMute: '--text-mute',
  textDisabled: '--text-disabled',
  brand: '--brand',
  brandSoft: '--brand-soft',
  ink: '--ink',
  success: '--success',
  danger: '--danger',
  warning: '--warning',
  info: '--info',
};

function themeVars(name: ThemeName) {
  const p = palettes[name];
  const out: Record<string, string> = { '--tint': String(tintAlpha[name]) };
  (Object.keys(keys) as (keyof Palette)[]).forEach((k) => {
    out[keys[k]] = rgbTriplet(p[k]);
  });
  return vars(out);
}

export const themeStyles: Record<ThemeName, ReturnType<typeof vars>> = {
  dark: themeVars('dark'),
  cream: themeVars('cream'),
};
