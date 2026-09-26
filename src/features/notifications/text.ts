// Algunos avisos de la API vienen en los dos idiomas: "Texto. / Text.". Se
// muestra solo la mitad del idioma de la app.
const BILINGUAL = /^(.+?[.!?]) \/ (.+[.!?])$/s;

export function localizedNotice(message: string, lang: 'es' | 'en'): string {
  const m = BILINGUAL.exec(message.trim());
  if (!m) return message;
  return (lang === 'en' ? m[2] : m[1]) ?? message;
}

// La bandeja no trae el tipo de aviso: los de mensaje nuevo se reconocen por
// el texto que arma api-go (message.go) en español o, los viejos, en inglés.
const MESSAGE_NOTICE = /respondió en tu reporte|replied on your report/i;

export const isMessageNotice = (message: string) => MESSAGE_NOTICE.test(message);
