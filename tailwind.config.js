// Tokens semánticos del rediseño para NativeWind 4 (Tailwind 3.4). Los valores
// viven en src/ui/tokens.ts y llegan como variables CSS por tema
// (src/ui/theme.ts); aquí solo se nombran.
const c = (name) => `rgb(var(--${name}) / <alpha-value>)`;
// Fondos de aviso: el color semántico al 12–18 % según el tema.
const tint = (name) => `rgb(var(--${name}) / var(--tint))`;
const { platformSelect } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
// Tamaños en rem: la base (16) se multiplica por el tamaño de texto elegido
// en Perfil y toda la app escala, como el zoom del prototipo.
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Folios: la monoespaciada del sistema (Menlo en iOS).
      fontFamily: { mono: platformSelect({ ios: 'Menlo', default: 'monospace' }) },
      colors: {
        bg: c('bg'),
        'surface-1': c('surface-1'),
        'surface-2': c('surface-2'),
        border: c('border'),
        text: c('text'),
        'text-soft': c('text-soft'),
        'text-mute': c('text-mute'),
        'text-disabled': c('text-disabled'),
        brand: c('brand'),
        'brand-soft': c('brand-soft'),
        ink: c('ink'),
        success: c('success'),
        danger: c('danger'),
        warning: c('warning'),
        info: c('info'),
        'brand-tint': tint('brand'),
        'success-tint': tint('success'),
        'danger-tint': tint('danger'),
        'warning-tint': tint('warning'),
        'info-tint': tint('info'),
      },
      // [tamaño, {lineHeight, letterSpacing}] del handoff.
      fontSize: {
        display: ['1.75rem', { lineHeight: '2.125rem', letterSpacing: '-0.28px' }],
        title: ['1.375rem', { lineHeight: '1.75rem', letterSpacing: '-0.22px' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.5rem' }],
        body: ['0.9375rem', { lineHeight: '1.375rem' }],
        caption: ['0.8125rem', { lineHeight: '1.125rem' }],
        label: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.24px' }],
        tab: ['0.6875rem', { lineHeight: '0.875rem' }],
        folio: ['0.75rem', { lineHeight: '1rem' }],
      },
      borderRadius: { sm: '8px', md: '12px', sheet: '20px', pill: '999px' },
      spacing: { 13: '3.25rem', 11: '2.75rem', 15: '3.75rem' },
    },
  },
  plugins: [],
};
