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
