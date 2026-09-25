import { createMMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

// Almacenamiento rápido para preferencias y caché (no para secretos: los
// tokens van en SecureStore). En Jest, MMKV se reemplaza solo por un mock.
export const storage = createMMKV({ id: 'eleva' });

export const zustandStorage: StateStorage = {
  getItem: (name) => storage.getString(name) ?? null,
  setItem: (name, value) => storage.set(name, value),
  removeItem: (name) => {
    storage.remove(name);
  },
};
