import { create } from 'zustand';

import type { ThemeName } from '@/ui/tokens';

export type ThemePref = 'system' | ThemeName;

// Preferencias del usuario. La persistencia (MMKV) y la pantalla de
// Accesibilidad llegan en la fase 5; por ahora vive en memoria.
type Prefs = {
  theme: ThemePref;
  setTheme: (t: ThemePref) => void;
};

export const usePrefs = create<Prefs>((set) => ({
  theme: 'system',
  setTheme: (theme) => set({ theme }),
}));
