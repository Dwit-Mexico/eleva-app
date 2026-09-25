// Tokens semánticos del rediseño para NativeWind 4 (Tailwind 3.4). Los valores
// viven en src/ui/tokens.ts y llegan como variables CSS por tema
// (src/ui/theme.ts); aquí solo se nombran.
const c = (name) => `rgb(var(--${name}) / <alpha-value>)`;
// Fondos de aviso: el color semántico al 12–18 % según el tema.
const tint = (name) => `rgb(var(--${name}) / var(--tint))`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
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
        display: ['28px', { lineHeight: '34px', letterSpacing: '-0.28px' }],
        title: ['22px', { lineHeight: '28px', letterSpacing: '-0.22px' }],
        'body-lg': ['17px', { lineHeight: '24px' }],
        body: ['15px', { lineHeight: '22px' }],
        caption: ['13px', { lineHeight: '18px' }],
        label: ['12px', { lineHeight: '16px', letterSpacing: '0.24px' }],
        tab: ['11px', { lineHeight: '14px' }],
        folio: ['12px', { lineHeight: '16px' }],
      },
      borderRadius: { sm: '8px', md: '12px', sheet: '20px', pill: '999px' },
      spacing: { 13: '52px', 11: '44px', 15: '60px' },
    },
  },
  plugins: [],
};
