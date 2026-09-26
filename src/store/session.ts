import { clearQueryCache } from '@/lib/queryClient';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

import { authApi } from '@/api/auth';
import { APIError, setAuth } from '@/api/client';
import type { AuthUser, Session } from '@/api/schemas';

// Sesión de la app: JWT de 24 h + refresh token de 90 días (rota en cada uso).
// Vive en SecureStore; la 3.x guardaba otra cosa en AsyncStorage (`LoginUser`,
// token de Koa) y no se migra: el usuario inicia sesión una vez.
const KEY = 'eleva.session.v4';

type Stored = { token: string; expiresAt: string; refreshToken?: string; user: AuthUser };

type State = {
  status: 'loading' | 'signedOut' | 'signedIn';
  token: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  hydrate: () => Promise<void>;
  signIn: (s: Session) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useSession = create<State>((set, get) => ({
  status: 'loading',
  token: null,
  refreshToken: null,
  user: null,

  hydrate: async () => {
    try {
      const raw = await SecureStore.getItemAsync(KEY);
      const s = raw ? (JSON.parse(raw) as Stored) : null;
      if (s?.token && s.user) {
        set({ status: 'signedIn', token: s.token, refreshToken: s.refreshToken ?? null, user: s.user });
        return;
      }
    } catch {
      // llavero ilegible: se pide login otra vez
    }
    set({ status: 'signedOut' });
  },

  signIn: async (s) => {
    if (!s.token || !s.user) throw new Error('session without token');
    const stored: Stored = { token: s.token, expiresAt: s.expiresAt, refreshToken: s.refreshToken, user: s.user };
    await SecureStore.setItemAsync(KEY, JSON.stringify(stored));
    set({ status: 'signedIn', token: s.token, refreshToken: s.refreshToken ?? null, user: s.user });
  },

  signOut: async () => {
    const rt = get().refreshToken;
    set({ status: 'signedOut', token: null, refreshToken: null, user: null });
    clearQueryCache();
    await SecureStore.deleteItemAsync(KEY).catch(() => {});
    // Revoca este dispositivo en el servidor; si no hay red, el token vence solo.
    if (rt) void authApi.logout(rt).catch(() => {});
  },
}));

// Renovación de un solo vuelo: varias peticiones con 401 a la vez esperan la
// misma renovación en lugar de rotar el token varias veces (el servidor
// tomaría la segunda como token reutilizado).
let inflight: Promise<string | null> | null = null;

export function refreshSession(): Promise<string | null> {
  if (inflight) return inflight;
  inflight = (async () => {
    const { refreshToken, signIn, signOut } = useSession.getState();
    if (!refreshToken) {
      await signOut();
      return null;
    }
    try {
      const { data } = await authApi.refresh(refreshToken);
      await signIn(data);
      return data.token ?? null;
    } catch (e) {
      // 409: otra renovación ganó; su token ya está en el store.
      if (e instanceof APIError && e.status === 409) return useSession.getState().token;
      // Sin red: se conserva la sesión (modo solo lectura) y se reintenta después.
      if (e instanceof APIError && e.offline) return null;
      await signOut();
      return null;
    }
  })().finally(() => {
    inflight = null;
  });
  return inflight;
}

setAuth({ getToken: () => useSession.getState().token, refresh: refreshSession });
