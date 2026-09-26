import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import i18n, { systemLanguage, type Language } from '@/i18n';
import { zustandStorage } from '@/lib/storage';
import type { ThemeName } from '@/ui/tokens';

export type ThemePref = 'system' | ThemeName;
export type TextScale = 1 | 1.3 | 1.6;

// Preferencias del usuario, en MMKV. El idioma se elige en el login (ES/EN)
// y en Perfil; el tema y el tamaño de texto en Perfil → Accesibilidad.
type Prefs = {
  theme: ThemePref;
  language: Language | null; // null = el del sistema
  textScale: TextScale; // Perfil → Tamaño de texto
  setTheme: (t: ThemePref) => void;
  setLanguage: (l: Language) => void;
  setTextScale: (s: TextScale) => void;
};

export const usePrefs = create<Prefs>()(
  persist(
    (set) => ({
      theme: 'system',
      language: null,
      textScale: 1,
      setTextScale: (textScale) => set({ textScale }),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => {
        void i18n.changeLanguage(language);
        set({ language });
      },
    }),
    {
      name: 'prefs',
      storage: createJSONStorage(() => zustandStorage),
      onRehydrateStorage: () => (state) => {
        void i18n.changeLanguage(state?.language ?? systemLanguage());
      },
    },
  ),
);

export const currentLanguage = (): Language => (i18n.language === 'en' ? 'en' : 'es');
