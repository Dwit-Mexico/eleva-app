// Algunos avisos de la API vienen en los dos idiomas: "Texto. / Text.". Se
// muestra solo la mitad del idioma de la app.
const BILINGUAL = /^(.+?[.!?]) \/ (.+[.!?])$/s;

export function localizedNotice(message: string, lang: 'es' | 'en'): string {
  const m = BILINGUAL.exec(message.trim());
  if (!m) return message;
  return (lang === 'en' ? m[2] : m[1]) ?? message;
}
