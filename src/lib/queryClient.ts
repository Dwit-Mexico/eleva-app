import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import Constants from 'expo-constants';

import { zustandStorage } from './storage';

// Caché de consultas persistida en MMKV: sin conexión la app muestra lo último
// que cargó (solo consulta). Se descarta al cambiar de versión o de sesión.
const DAY = 24 * 60 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000, gcTime: 7 * DAY } },
});

export const persister = createSyncStoragePersister({
  storage: {
    getItem: (k) => zustandStorage.getItem(k) as string | null,
    setItem: (k, v) => void zustandStorage.setItem(k, v),
    removeItem: (k) => void zustandStorage.removeItem(k),
  },
  key: 'query-cache',
  throttleTime: 1000,
});

export const persistOptions = {
  persister,
  maxAge: 7 * DAY,
  buster: Constants.expoConfig?.version ?? '0',
};

// Al cerrar sesión no deben quedar datos de otra cuenta.
export function clearQueryCache() {
  queryClient.clear();
  persister.removeClient();
}
