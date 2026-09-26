import type { TFunction } from 'i18next';

// Fecha relativa por día, como el prototipo: hoy, ayer, hace N días,
// semanas o meses.
export function relativeTime(date: Date, t: TFunction, now: Date = new Date()): string {
  const days = Math.round((startOfDay(now) - startOfDay(date)) / 86400000);
  if (days <= 0) return t('time.today');
  if (days === 1) return t('time.yesterday');
  if (days < 7) return t('time.days', { count: days });
  if (days < 30) return t('time.weeks', { count: Math.floor(days / 7) });
  return t('time.months', { count: Math.max(1, Math.floor(days / 30)) });
}

export function formatDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

// "jueves 25 sep · 10:00" en el idioma de la app (visitas).
export function formatVisit(date: Date, lang: 'es' | 'en'): string {
  const locale = lang === 'en' ? 'en-US' : 'es-MX';
  const day = date.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'short' });
  const time = date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false });
  return `${day} · ${time}`;
}

// "Lunes 28 de septiembre" / "Monday, September 28" y "10:00" (fechas propuestas).
export function formatDay(date: Date, lang: 'es' | 'en'): string {
  const locale = lang === 'en' ? 'en-US' : 'es-MX';
  const s = date.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' });
  const out = lang === 'es' ? s.replace(',', '') : s;
  return out.charAt(0).toUpperCase() + out.slice(1);
}

export function formatTime(date: Date, lang: 'es' | 'en'): string {
  return date.toLocaleTimeString(lang === 'en' ? 'en-US' : 'es-MX', { hour: '2-digit', minute: '2-digit', hour12: false });
}
