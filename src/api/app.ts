import { z } from 'zod';

import { request as call } from './client';
import { catalogItem, inboxItem, ownerUnit, request, unitArea, unitEquipment } from './schemas';

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
  notifications: () => call('GET', '/app/notifications', z.array(inboxItem)),
};
