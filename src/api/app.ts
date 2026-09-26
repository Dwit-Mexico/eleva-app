import { z } from 'zod';

import { request as call } from './client';
import { catalogItem, chatMessage, chatThread, documentFile, documentFolder, householdMember, inboxItem, ownerUnit, request, unitArea, unitEquipment } from './schemas';

// Endpoints de la app (kind=app) de la API v1.
export const appApi = {
  units: () => call('GET', '/app/units', z.array(ownerUnit)),
  unitAreas: (unitId: number) => call('GET', `/app/units/${unitId}/areas`, z.array(unitArea)),
  // id = UnitArea.id (el área del tipo de unidad, no el catálogo)
  areaEquipment: (unitAreaId: number) => call('GET', `/app/unit-areas/${unitAreaId}/equipment`, z.array(unitEquipment)),
  // id = UnitEquipment.equipmentId
  equipmentProblems: (equipmentId: number) => call('GET', `/app/equipment/${equipmentId}/problems`, z.array(catalogItem)),
  requests: () => call('GET', '/app/requests', z.array(request)),
  request: (id: number) => call('GET', `/app/requests/${id}`, request),
  // multipart: unitId, areaId, equipmentId, problemId, description, images[] (≤3), video
  createRequest: (form: FormData) => call('POST', '/app/requests', request, { form }),
  // multipart: unitId, areaId (opcional), description, images[]/video (≥1)
  createQuick: (form: FormData) => call('POST', '/app/requests/quick', request, { form }),
  // date: una de proposedDates (ISO)
  schedule: (id: number, body: { date: string; notes?: string }) =>
    call('POST', `/app/requests/${id}/schedule`, request, { body }),
  // repaired=false reabre la solicitud para otra visita
  rate: (id: number, body: { repaired: boolean; score: number; comment?: string }) =>
    call('POST', `/app/requests/${id}/rating`, request, { body }),
  cancel: (id: number) => call('POST', `/app/requests/${id}/cancel`, request),
  // Leer los mensajes los marca como leídos.
  messages: (id: number) => call('GET', `/app/requests/${id}/messages`, z.array(chatMessage)),
  // multipart: text, image (opcional)
  sendMessage: (id: number, form: FormData) => call('POST', `/app/requests/${id}/messages`, chatMessage, { form }),
  messageSummary: () => call('GET', '/app/messages/summary', z.array(chatThread)),
  folders: () => call('GET', '/app/document-folders', z.array(documentFolder)),
  documents: (folderId: number) => call('GET', `/app/document-folders/${folderId}/documents`, z.array(documentFile)),
  readNotification: (id: number) => call('POST', `/app/notifications/${id}/read`, z.unknown()),
  members: () => call('GET', '/app/household-members', z.array(householdMember)),
  addMember: (body: { unitId: number; firstName: string; lastName?: string; email: string; phone?: string }) =>
    call('POST', '/app/household-members', z.unknown(), { body }),
  removeMember: (personId: number) => call('DELETE', `/app/household-members/${personId}`, z.unknown()),
  notifications: () => call('GET', '/app/notifications', z.array(inboxItem)),
};
