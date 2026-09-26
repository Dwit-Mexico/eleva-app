import { z } from 'zod';

// Contratos de la API v1 (api-go, internal/core/domain). Solo lo que usa la
// app; los campos que no se leen no se validan.

export const localized = z.object({ es: z.string(), en: z.string() });
export type Localized = z.infer<typeof localized>;

export const authUser = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  profileId: z.number().optional(),
  profileName: z.string().optional(),
  owner: z.boolean(),
  unitId: z.number().nullish(),
  address: z.string().nullish(),
});
export type AuthUser = z.infer<typeof authUser>;

export const session = z.object({
  token: z.string().optional(),
  activationToken: z.string().optional(),
  expiresAt: z.string(),
  mustChangePassword: z.boolean(),
  user: authUser.optional(),
  refreshToken: z.string().optional(),
  refreshExpiresAt: z.string().optional(),
});
export type Session = z.infer<typeof session>;

export const appConfig = z.object({
  minVersion: z.string(),
  latestVersion: z.string(),
  storeUrls: z.object({ ios: z.string(), android: z.string() }),
});
export type AppConfig = z.infer<typeof appConfig>;

// --- viviendas y catálogos del wizard ---

export const ownerUnit = z.object({
  contractId: z.number(),
  unitId: z.number(),
  label: z.string(), // "101 - Torre"
  name: z.string(), // proyecto
  address: z.string().nullish(),
  warrantyExpiresAt: z.string().nullish(),
});
export type OwnerUnit = z.infer<typeof ownerUnit>;

export const unitArea = z.object({ id: z.number(), areaId: z.number(), name: localized });
export type UnitArea = z.infer<typeof unitArea>;

export const unitEquipment = z.object({ id: z.number(), equipmentId: z.number(), name: localized });
export type UnitEquipment = z.infer<typeof unitEquipment>;

export const catalogItem = z.object({ id: z.number(), name: localized });
export type CatalogItem = z.infer<typeof catalogItem>;

// --- solicitudes ---

const namedRef = z.object({ id: z.number(), name: z.string() });
const catalogRef = z.object({ id: z.number(), name: localized });

export const timelineStep = z.object({
  key: z.enum(['received', 'reviewed', 'scheduled', 'repaired', 'closed']),
  state: z.enum(['done', 'now', 'todo']),
  at: z.string().nullish(),
});
export type TimelineStep = z.infer<typeof timelineStep>;

export const request = z.object({
  id: z.number(),
  folio: z.string(),
  createdAt: z.string(),
  status: z.object({ id: z.number(), name: z.string() }),
  unit: namedRef,
  project: namedRef,
  area: catalogRef,
  equipment: catalogRef,
  problem: catalogRef,
  description: z.string().nullish(),
  media: z
    .object({
      images: z.array(z.string()).nullish(),
      video: z.string().nullish(),
      evidence: z.array(z.string()).nullish(),
    })
    .nullish(),
  warranty: z.object({ applies: z.boolean().nullish(), notes: z.string().nullish() }).nullish(),
  proposedDates: z.array(z.string()).nullish(),
  visit: z.object({ scheduledAt: z.string().nullish(), notes: z.string().nullish() }).nullish(),
  repairNotes: z.string().nullish(),
  rating: z
    .object({ repaired: z.boolean().nullish(), comment: z.string().nullish(), score: z.number().nullish() })
    .nullish(),
  completedAt: z.string().nullish(),
  needsClassification: z.boolean().optional(),
  canRate: z.boolean().optional(),
  stage: z.enum(['status', 'rating', 'history']),
  timeline: z.array(timelineStep).optional(),
});
export type Request = z.infer<typeof request>;

export const chatMessage = z.object({
  id: z.number(),
  requestId: z.number(),
  author: z.enum(['owner', 'team']),
  authorName: z.string(),
  text: z.string(),
  imageUrl: z.string().nullish(),
  sentAt: z.string(),
  read: z.boolean(),
  // Lo escribió quien pregunta (con reportes compartidos puede ser otra
  // persona de la vivienda). Sin el campo (API vieja): todo 'owner' es mío.
  mine: z.boolean().optional(),
  deleted: z.boolean().optional(), // lo borró quien lo escribió (sin texto ni foto)
});
export type ChatMessage = z.infer<typeof chatMessage>;

export const chatThread = z.object({
  requestId: z.number(),
  unread: z.number(),
  lastAt: z.string(),
  total: z.number(),
  // Último mensaje (0007): texto, autor y si trae foto.
  lastText: z.string().nullish(),
  lastAuthor: z.enum(['owner', 'team']).nullish(),
  lastPhoto: z.boolean().nullish(),
  lastMine: z.boolean().nullish(),
  lastDeleted: z.boolean().nullish(),
});
export type ChatThread = z.infer<typeof chatThread>;

export const documentFolder = z.object({
  id: z.number(),
  name: z.string(),
  project: z.object({ id: z.number(), name: z.string() }).nullish(),
  documentCount: z.number(),
});
export type DocumentFolder = z.infer<typeof documentFolder>;

export const documentFile = z.object({
  id: z.number(),
  name: z.string(),
  folderId: z.number(),
  url: z.string(),
  size: z.number().nullish(),
  uploadedAt: z.string().nullish(),
});
export type DocumentFile = z.infer<typeof documentFile>;

export const householdMember = z.object({
  personId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  unitId: z.number(),
  unitNumber: z.string(),
  removable: z.boolean(),
});
export type HouseholdMember = z.infer<typeof householdMember>;

export const inboxItem = z.object({
  id: z.number(),
  sentAt: z.string(),
  message: z.string(),
  requestId: z.number().nullish(),
  read: z.boolean(),
});
export type InboxItem = z.infer<typeof inboxItem>;
