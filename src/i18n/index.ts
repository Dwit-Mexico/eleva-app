import { getLocales } from 'expo-localization';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en';
import es from './es';

export type Language = 'es' | 'en';

// Idioma del sistema (español si no es inglés). La elección manual se guarda
// en preferencias (fase 5) y se aplica con i18n.changeLanguage.
export function systemLanguage(): Language {
  return getLocales()[0]?.languageCode === 'en' ? 'en' : 'es';
}

const i18n = createInstance();

void i18n.use(initReactI18next).init({
  resources: { es: { translation: es }, en: { translation: en } },
  lng: systemLanguage(),
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
