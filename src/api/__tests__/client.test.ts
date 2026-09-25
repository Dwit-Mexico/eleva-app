import { z } from 'zod';

import { APIError, errorText, request, setAuth } from '../client';

const ok = (data: unknown, status = 200) =>
  ({ ok: status < 400, status, json: async () => ({ success: true, message: { es: 'Listo', en: 'Done' }, data }) }) as Response;
const fail = (status: number, body: object) => ({ ok: false, status, json: async () => body }) as Response;

const fetchMock = jest.fn();
beforeEach(() => {
  fetchMock.mockReset();
  globalThis.fetch = fetchMock as unknown as typeof fetch;
  setAuth({ getToken: () => 'viejo', refresh: async () => null });
});

describe('request', () => {
  it('desenvuelve data y valida con zod', async () => {
    fetchMock.mockResolvedValueOnce(ok({ n: 1 }));
    const r = await request('GET', '/x', z.object({ n: z.number() }));
    expect(r.data).toEqual({ n: 1 });
    expect(r.message.es).toBe('Listo');
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toMatch(/\/api\/v1\/x$/);
    expect(init.headers.Authorization).toBe('Bearer viejo');
    expect(init.headers['App-Platform']).toBeDefined();
  });

  it('las rutas públicas no mandan Authorization', async () => {
    fetchMock.mockResolvedValueOnce(ok(null));
    await request('POST', '/auth/app/login', z.unknown(), { body: { a: 1 }, authenticated: false });
    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBeUndefined();
  });

  it('convierte el envelope de error en APIError con schema', async () => {
    fetchMock.mockResolvedValueOnce(
      fail(400, { success: false, message: { es: 'Datos inválidos', en: 'Invalid data' }, schema: { email: ['required'] } }),
    );
    const e = await request('POST', '/x', z.unknown()).catch((x) => x);
    expect(e).toBeInstanceOf(APIError);
    expect(e.status).toBe(400);
    expect(e.schema).toEqual({ email: ['required'] });
    expect(errorText(e, 'es')).toBe('Datos inválidos');
    expect(errorText(e, 'en')).toBe('Invalid data');
  });

  it('sin red lanza un APIError offline', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Network request failed'));
    const e = await request('GET', '/x', z.unknown()).catch((x) => x);
    expect(e.offline).toBe(true);
  });

  it('con 401 renueva una vez y reintenta con el token nuevo', async () => {
    const refresh = jest.fn(async () => 'nuevo');
    setAuth({ getToken: () => 'viejo', refresh });
    fetchMock.mockResolvedValueOnce(fail(401, { success: false })).mockResolvedValueOnce(ok({ n: 2 }));
    const r = await request('GET', '/x', z.object({ n: z.number() }));
    expect(r.data.n).toBe(2);
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[1][1].headers.Authorization).toBe('Bearer nuevo');
  });

  it('si no se puede renovar, regresa el 401', async () => {
    fetchMock.mockResolvedValueOnce(fail(401, { success: false, message: { es: 'Sesión', en: 'Session' } }));
    const e = await request('GET', '/x', z.unknown()).catch((x) => x);
    expect(e.status).toBe(401);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
