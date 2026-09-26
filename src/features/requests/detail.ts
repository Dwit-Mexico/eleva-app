import type { LucideIcon } from 'lucide-react-native';
import { CalendarCheck, CheckCircle2, Hourglass, Info, PauseCircle, PhoneCall, Star, XCircle } from 'lucide-react-native';

import type { Request, TimelineStep } from '@/api/schemas';

const KEYS: TimelineStep['key'][] = ['received', 'reviewed', 'scheduled', 'repaired', 'closed'];
// Pasos hechos por estatus cuando la API no manda timeline (prototipo: doneMap).
const DONE: Record<number, number> = { 1: 1, 2: 2, 3: 5, 4: 2, 5: 3, 6: 5, 7: 4, 8: 4, 9: 5, 10: 2 };

export function timelineOf(r: Request): TimelineStep[] {
  if (r.timeline?.length) return r.timeline;
  const done = DONE[r.status.id] ?? 1;
  return KEYS.map((key, i) => ({
    key,
    state: i < done ? 'done' : i === done ? 'now' : 'todo',
    at: i === 0 ? r.createdAt : null,
  }));
}

const ICONS: Record<number, LucideIcon> = {
  1: Hourglass,
  2: CheckCircle2,
  3: Info,
  4: PhoneCall,
  5: CalendarCheck,
  6: XCircle,
  7: Star,
  8: Star,
  9: CheckCircle2,
  10: PauseCircle,
};

// "Qué sigue": llave de i18n e ícono según el estatus.
export function nextStep(r: Request): { key: string; icon: LucideIcon } {
  if (r.needsClassification && r.status.id === 1) return { key: 'detail.nextClassify', icon: Hourglass };
  if (r.status.id === 5) return { key: r.visit?.scheduledAt ? 'detail.next5' : 'detail.next5NoDate', icon: CalendarCheck };
  return { key: `detail.next${r.status.id}`, icon: ICONS[r.status.id] ?? Info };
}

// Se puede cancelar mientras no hay trabajo hecho (prototipo: 1, 4 y 5).
export const canCancel = (r: Request) => [1, 4, 5].includes(r.status.id);

export const canSchedule = (r: Request) => r.status.id === 4 && (r.proposedDates?.length ?? 0) > 0;

// Fotos y video del propietario, en el orden del visor.
export function ownerMedia(r: Request): { kind: 'photo' | 'video'; url: string }[] {
  return [
    ...(r.media?.images ?? []).map((url) => ({ kind: 'photo' as const, url })),
    ...(r.media?.video ? [{ kind: 'video' as const, url: r.media.video }] : []),
  ];
}
