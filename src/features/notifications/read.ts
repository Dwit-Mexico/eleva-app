import type { QueryClient } from '@tanstack/react-query';

import { appApi } from '@/api/app';
import { keys } from '@/api/queries';
import type { InboxItem } from '@/api/schemas';

import { isMessageNotice } from './text';

// Marca el aviso como leído al momento (caché) y en la API; si falla, se
// vuelve a pedir la bandeja.
export function markNoticeRead(qc: QueryClient, n: InboxItem) {
  if (n.read) return;
  qc.setQueryData<InboxItem[]>(keys.notifications, (prev) =>
    prev?.map((x) => (x.id === n.id ? { ...x, read: true } : x)),
  );
  appApi.readNotification(n.id).catch(() => void qc.invalidateQueries({ queryKey: keys.notifications }));
}

// A dónde lleva tocar un aviso: mensaje → chat, de reporte → detalle, general
// → la pantalla del aviso (es donde se lee completo).
export function noticeTarget(n: InboxItem): string {
  if (!n.requestId) return `/notifications/${n.id}`;
  return isMessageNotice(n.message) ? `/reports/${n.requestId}/messages` : `/reports/${n.requestId}`;
}
