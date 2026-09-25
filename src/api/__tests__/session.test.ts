import { authApi } from '../auth';
import { APIError } from '../client';
import { refreshSession, useSession } from '../../store/session';

jest.mock('expo-secure-store', () => {
  const mem = new Map<string, string>();
  return {
    getItemAsync: async (k: string) => mem.get(k) ?? null,
    setItemAsync: async (k: string, v: string) => void mem.set(k, v),
    deleteItemAsync: async (k: string) => void mem.delete(k),
  };
});

const user = { id: 366, email: 'qa@eleva.test', name: 'QA', owner: true };
const session = (n: number) => ({
  token: `t${n}`,
  refreshToken: `r${n}`,
  expiresAt: '2026-09-26T00:00:00Z',
  mustChangePassword: false,
  user,
});

beforeEach(async () => {
  jest.restoreAllMocks();
  jest.spyOn(authApi, 'logout').mockResolvedValue({ data: null, message: { es: '', en: '' } });
  await useSession.getState().signIn(session(1));
});

describe('refreshSession', () => {
  it('es de un solo vuelo: varias llamadas rotan una sola vez', async () => {
    const spy = jest.spyOn(authApi, 'refresh').mockResolvedValue({ data: session(2), message: { es: '', en: '' } });
    const [a, b, c] = await Promise.all([refreshSession(), refreshSession(), refreshSession()]);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('r1');
    expect([a, b, c]).toEqual(['t2', 't2', 't2']);
    expect(useSession.getState().refreshToken).toBe('r2');
  });

  it('sin red conserva la sesión', async () => {
    jest.spyOn(authApi, 'refresh').mockRejectedValue(new APIError(0, { es: '', en: '' }));
    expect(await refreshSession()).toBeNull();
    expect(useSession.getState().status).toBe('signedIn');
  });

  it('con 401 cierra la sesión', async () => {
    jest.spyOn(authApi, 'refresh').mockRejectedValue(new APIError(401, { es: '', en: '' }));
    expect(await refreshSession()).toBeNull();
    expect(useSession.getState().status).toBe('signedOut');
    expect(authApi.logout).toHaveBeenCalledWith('r1');
  });

  it('la sesión sobrevive a reiniciar la app', async () => {
    useSession.setState({ status: 'loading', token: null, refreshToken: null, user: null });
    await useSession.getState().hydrate();
    expect(useSession.getState()).toMatchObject({ status: 'signedIn', token: 't1', refreshToken: 'r1' });
  });
});
