import { COLORS, cn, FONT_SIZES, RADII } from '../cn';

describe('cn', () => {
  it('ignora lo falso y une lo verdadero', () => {
    expect(cn('flex-row', false && 'hidden', undefined, 'gap-2')).toBe('flex-row gap-2');
  });
  it('la última clase en conflicto gana', () => {
    expect(cn('px-4 bg-brand', 'px-5')).toBe('bg-brand px-5');
    expect(cn('bg-surface-1', 'bg-brand')).toBe('bg-brand');
    expect(cn('rounded-md', 'rounded-pill')).toBe('rounded-pill');
  });
  it('no confunde tamaño y color de texto', () => {
    expect(cn('text-body text-text', 'text-text-soft')).toBe('text-body text-text-soft');
    expect(cn('text-caption text-brand-soft', 'text-body')).toBe('text-brand-soft text-body');
    expect(cn('min-h-11', 'min-h-13')).toBe('min-h-13');
  });
  it('los tokens son los de tailwind.config.js', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ext = require('../../../tailwind.config.js').theme.extend;
    expect(Object.keys(ext.fontSize).sort()).toEqual([...FONT_SIZES].sort());
    expect(Object.keys(ext.colors).sort()).toEqual([...COLORS].sort());
    expect(Object.keys(ext.borderRadius).sort()).toEqual([...RADII].sort());
  });
});
