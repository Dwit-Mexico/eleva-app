// MMKV es un módulo nativo (Nitro): en Jest se reemplaza por un mapa en memoria.
jest.mock('react-native-mmkv', () => ({
  createMMKV: () => {
    const mem = new Map();
    return {
      set: (k, v) => mem.set(k, v),
      getString: (k) => mem.get(k),
      remove: (k) => mem.delete(k),
      contains: (k) => mem.has(k),
      clearAll: () => mem.clear(),
    };
  },
}));
