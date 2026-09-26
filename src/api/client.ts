import Constants from 'expo-constants';
import { Platform } from 'react-native';
import type { z } from 'zod';

import type { Localized } from './schemas';

// Cliente de la API v1 (api-go). Todas las respuestas vienen en el envelope
// {success, message:{en,es}, data, schema, error} con códigos HTTP reales.

const BASE = (process.env.EXPO_PUBLIC_API_URL ?? 'https://api-customerservice.elevacap.com').replace(/\/$/, '');
const APP_VERSION = Constants.expoConfig?.version ?? '0.0.0';

export class APIError extends Error {
  status: number;
  messages: Localized; // mensaje del servidor en los dos idiomas
  schema?: Record<string, string[]>; // errores por campo (400)
  constructor(status: number, messages: Localized, schema?: Record<string, string[]>) {
    super(messages.en || `HTTP ${status}`);
    this.status = status;
    this.messages = messages;
    this.schema = schema;
  }
  // 0 = sin respuesta del servidor (sin red o caído).
  get offline() {
    return this.status === 0;
  }
}

export type Auth = {
  // Token vigente; null si no hay sesión.
  getToken: () => string | null;
  // Renueva la sesión y regresa el token nuevo, o null si ya no se puede.
  refresh: () => Promise<string | null>;
};

let auth: Auth | null = null;
// La sesión se registra al arrancar (store/session) para no importar en ciclo.
export function setAuth(a: Auth) {
  auth = a;
}

type Options = {
  body?: unknown;
  form?: FormData;
  query?: Record<string, string | number | undefined>;
  // false para rutas públicas (login, recuperación, config).
  authenticated?: boolean;
  bearer?: string; // token específico (p. ej. el de activación)
  signal?: AbortSignal;
};

async function send(method: string, path: string, opts: Options, token: string | null): Promise<Response> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'App-Platform': Platform.OS,
    'App-Version': APP_VERSION,
  };
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;
  const q = opts.query
    ? '?' +
      Object.entries(opts.query)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join('&')
    : '';
  try {
    return await fetch(`${BASE}/api/v1${path}${q}`, {
      method,
      headers,
      body: opts.form ?? (opts.body !== undefined ? JSON.stringify(opts.body) : undefined),
      signal: opts.signal,
    });
  } catch (e) {
    if (__DEV__) console.warn(`[api] ${method} ${path}:`, e);
    throw new APIError(0, { es: 'Sin conexión', en: 'No connection' });
  }
}

type Envelope = {
  success?: boolean;
  message?: Localized;
  data?: unknown;
  schema?: Record<string, string[]>;
};

async function unwrap(res: Response): Promise<Envelope> {
  let body: Envelope = {};
  try {
    body = (await res.json()) as Envelope;
  } catch {
    // respuesta sin JSON (p. ej. un 502 del proxy)
  }
  if (!res.ok || body.success === false) {
    throw new APIError(res.status, body.message ?? { es: 'Ocurrió un error', en: 'Something went wrong' }, body.schema);
  }
  return body;
}

export type Result<T> = { data: T; message: Localized };

// Petición con renovación: si el servidor responde 401 con una sesión, se
// renueva una sola vez (la renovación es de un solo vuelo) y se reintenta.
export async function request<S extends z.ZodTypeAny>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  schema: S,
  opts: Options = {},
): Promise<Result<z.infer<S>>> {
  const useSession = opts.authenticated !== false && !opts.bearer;
  const token = opts.bearer ?? (useSession ? (auth?.getToken() ?? null) : null);
  let res = await send(method, path, opts, token);
  if (res.status === 401 && useSession && auth) {
    const renewed = await auth.refresh();
    if (renewed) res = await send(method, path, opts, renewed);
  }
  const body = await unwrap(res);
  return { data: schema.parse(body.data) as z.infer<S>, message: body.message ?? { es: '', en: '' } };
}

// Mensaje del error en el idioma de la app.
export function errorText(e: unknown, lang: 'es' | 'en'): string {
  if (e instanceof APIError) return e.messages[lang] || e.messages.es;
  return lang === 'en' ? 'Something went wrong' : 'Ocurrió un error';
}
