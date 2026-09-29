import { palettes, type ThemeName } from '../tokens';

// WCAG 2.x: el texto chico necesita 4.5:1 contra su fondo.
function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}
const ratio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
};

describe.each(['dark', 'cream'] as ThemeName[])('contraste en %s', (theme) => {
  const p = palettes[theme];
  it.each(['text', 'textSoft', 'textMute'] as const)('%s pasa AA sobre fondo, tarjeta y campo', (fg) => {
    for (const bg of [p.bg, p.surface1, p.surface2]) {
      expect(ratio(p[fg], bg)).toBeGreaterThanOrEqual(4.5);
    }
  });
});
