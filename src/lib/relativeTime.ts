import type { TFunction } from 'i18next';

// Fecha relativa corta ("Hace 2 días"). Después de una semana, la fecha
// completa dd/mm/aaaa. Propio en vez de Intl.RelativeTimeFormat para no
// depender de lo que traiga Hermes.
export function relativeTime(date: Date, t: TFunction, now: Date = new Date()): string {
  const minutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  if (minutes < 1) return t('time.now');
  if (minutes < 60) return t('time.minutes', { count: minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 24 && now.getDate() === date.getDate()) return t('time.hours', { count: hours });
  const days = Math.round((startOfDay(now) - startOfDay(date)) / 86400000);
  if (days <= 1) return t('time.yesterday');
  if (days < 7) return t('time.days', { count: days });
  return formatDate(date);
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
