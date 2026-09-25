import { palettes, rgbTriplet, withAlpha } from '../tokens';

describe('tokens', () => {
  it('convierte hex a la terna de las variables CSS', () => {
    expect(rgbTriplet('#B29360')).toBe('178 147 96');
    expect(withAlpha('#18191A', 0.5)).toBe('rgba(24, 25, 26, 0.5)');
  });

  it('los dos temas definen los mismos tokens', () => {
    expect(Object.keys(palettes.cream).sort()).toEqual(Object.keys(palettes.dark).sort());
  });

  it('el texto sobre dorado es ink, no blanco (AA)', () => {
    // Blanco sobre #B29360 da 2.9:1; ink lo pasa.
    expect(palettes.dark.ink).toBe('#18191A');
  });
});
