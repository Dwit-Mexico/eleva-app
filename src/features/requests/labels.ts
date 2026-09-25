import type { Localized, Request } from '@/api/schemas';

export const loc = (l: Localized, lang: 'es' | 'en') => l[lang] || l.es;

// Título de la tarjeta: el problema; un reporte rápido sin clasificar usa la
// primera línea de lo que escribió el propietario.
export function requestTitle(r: Request, lang: 'es' | 'en', quickFallback: string): string {
  if (r.needsClassification) {
    const first = r.description?.split('\n')[0]?.trim();
    return first || quickFallback;
  }
  return loc(r.problem.name, lang);
}

export function requestLocation(r: Request, lang: 'es' | 'en'): string {
  if (r.needsClassification) return r.unit.name;
  return `${loc(r.area.name, lang)} · ${loc(r.equipment.name, lang)}`;
}

export const byNewest = (a: Request, b: Request) => b.createdAt.localeCompare(a.createdAt);
