import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { create } from 'zustand';

import { authApi } from '@/api/auth';
import type { AppConfig } from '@/api/schemas';
import { isBelow } from '@/lib/version';

export const APP_VERSION = Constants.expoConfig?.version ?? '0.0.0';

// GET /app/config compartido: la raíz decide si bloquea (minVersion) y el
// Inicio si ofrece la versión nueva (latestVersion). Sin red se queda con lo
// último que tenía.
export const useAppConfig = create<{ config: AppConfig | null; refresh: () => Promise<void> }>((set) => ({
  config: null,
  refresh: async () => {
    try {
      const { data } = await authApi.config();
      set({ config: data });
    } catch {
      // sin red: se revisa la próxima vez
    }
  },
}));

export const mustUpdate = (c: AppConfig | null) => !!c && isBelow(APP_VERSION, c.minVersion);
export const canUpdate = (c: AppConfig | null) => !!c && !!c.latestVersion && isBelow(APP_VERSION, c.latestVersion);
export const storeUrl = (c: AppConfig) => (Platform.OS === 'ios' ? c.storeUrls.ios : c.storeUrls.android);
