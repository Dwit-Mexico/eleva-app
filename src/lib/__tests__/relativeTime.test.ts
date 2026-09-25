import i18n from '@/i18n';

import { formatDate, relativeTime } from '../relativeTime';

const t = i18n.t.bind(i18n);
const now = new Date(2026, 8, 25, 15, 0);

describe('relativeTime', () => {
  beforeAll(() => i18n.changeLanguage('es'));

  it('usa minutos, horas, ayer y días', () => {
    expect(relativeTime(new Date(2026, 8, 25, 14, 59, 30), t, now)).toBe('Ahora');
    expect(relativeTime(new Date(2026, 8, 25, 14, 45), t, now)).toBe('Hace 15 min');
    expect(relativeTime(new Date(2026, 8, 25, 12, 0), t, now)).toBe('Hace 3 h');
    expect(relativeTime(new Date(2026, 8, 24, 20, 0), t, now)).toBe('Ayer');
    expect(relativeTime(new Date(2026, 8, 22, 9, 0), t, now)).toBe('Hace 3 días');
  });

  it('después de una semana muestra la fecha', () => {
    expect(relativeTime(new Date(2026, 8, 1, 9, 0), t, now)).toBe('01/09/2026');
    expect(formatDate(new Date(2026, 0, 5))).toBe('05/01/2026');
  });
});
