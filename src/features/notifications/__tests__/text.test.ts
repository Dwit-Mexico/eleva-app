import { isMessageNotice, localizedNotice } from '../text';

describe('localizedNotice', () => {
  const both =
    'Customer Service respondió en tu reporte QA-101-1. / Customer Service replied on your report QA-101-1.';

  it('elige la mitad del idioma', () => {
    expect(localizedNotice(both, 'es')).toBe('Customer Service respondió en tu reporte QA-101-1.');
    expect(localizedNotice(both, 'en')).toBe('Customer Service replied on your report QA-101-1.');
  });

  it('deja igual los avisos de un solo idioma', () => {
    const one = 'Visita de 10:00 / 12:00 confirmada';
    expect(localizedNotice(one, 'en')).toBe(one);
  });
});

describe('isMessageNotice', () => {
  it('reconoce los avisos de mensaje nuevo', () => {
    expect(isMessageNotice('Customer Service respondió en tu reporte QA-101-2.')).toBe(true);
    expect(isMessageNotice('Tu visita quedó programada')).toBe(false);
  });
});
