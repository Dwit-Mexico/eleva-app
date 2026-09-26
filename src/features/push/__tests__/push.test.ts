import { pushTarget } from '../push';

jest.mock('expo-notifications', () => ({ setNotificationHandler: jest.fn() }));
jest.mock('expo-device', () => ({ isDevice: false }));
jest.mock('expo-constants', () => ({ expoConfig: { extra: { eas: { projectId: 'x' } } } }));
jest.mock('@/api/app', () => ({ appApi: {} }));

describe('pushTarget', () => {
  it('abre el chat en los avisos de mensaje', () => {
    expect(pushTarget({ screen: 'messages', requestId: 12 })).toBe('/reports/12/messages');
  });
  it('abre el detalle en calificar y en los de estatus', () => {
    expect(pushTarget({ screen: 'rating', requestId: 7 })).toBe('/reports/7');
    expect(pushTarget({ screen: 'Notificaciones', requestId: '9' })).toBe('/reports/9');
  });
  it('sin reporte abre la bandeja', () => {
    expect(pushTarget({ screen: 'Notificaciones' })).toBe('/notifications');
    expect(pushTarget(undefined)).toBe('/notifications');
  });
});
