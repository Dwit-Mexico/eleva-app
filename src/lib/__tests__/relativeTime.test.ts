import i18n from '@/i18n';

import { formatDate, relativeTime } from '../relativeTime';

const t = i18n.t.bind(i18n);
const now = new Date(2026, 8, 25, 15, 0);

describe('relativeTime', () => {
  beforeAll(() => i18n.changeLanguage('es'));

  it('cuenta por día, como el prototipo', () => {
    expect(relativeTime(new Date(2026, 8, 25, 9, 0), t, now)).toBe('hoy');
    expect(relativeTime(new Date(2026, 8, 24, 20, 0), t, now)).toBe('ayer');
    expect(relativeTime(new Date(2026, 8, 22, 9, 0), t, now)).toBe('hace 3 días');
    expect(relativeTime(new Date(2026, 8, 18, 9, 0), t, now)).toBe('hace 1 semana');
    expect(relativeTime(new Date(2026, 8, 4, 9, 0), t, now)).toBe('hace 3 semanas');
    expect(relativeTime(new Date(2026, 6, 20, 9, 0), t, now)).toBe('hace 2 meses');
  });

  it('formatea la fecha', () => {
    expect(formatDate(new Date(2026, 0, 5))).toBe('05/01/2026');
  });
});
