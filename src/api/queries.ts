import { useQuery, useQueryClient } from '@tanstack/react-query';

import { appApi } from './app';
import type { Request } from './schemas';

// Llaves de caché compartidas (la persistencia sin conexión llega en la fase 6).
export const keys = {
  units: ['units'] as const,
  requests: ['requests'] as const,
  request: (id: number) => ['requests', id] as const,
  areas: (unitId: number) => ['areas', unitId] as const,
  equipment: (unitAreaId: number) => ['equipment', unitAreaId] as const,
  problems: (equipmentId: number) => ['problems', equipmentId] as const,
  notifications: ['notifications'] as const,
  messages: (id: number) => ['messages', id] as const,
  threads: ['threads'] as const,
  folders: ['folders'] as const,
  members: ['members'] as const,
  documents: (folderId: number) => ['documents', folderId] as const,
};

const data = <T,>(p: Promise<{ data: T }>) => p.then((r) => r.data);

export const useUnits = () => useQuery({ queryKey: keys.units, queryFn: () => data(appApi.units()) });

export const useRequests = () => useQuery({ queryKey: keys.requests, queryFn: () => data(appApi.requests()) });

export const useUnitAreas = (unitId?: number) =>
  useQuery({
    queryKey: keys.areas(unitId ?? 0),
    queryFn: () => data(appApi.unitAreas(unitId!)),
    enabled: !!unitId,
    staleTime: 10 * 60_000,
  });

export const useAreaEquipment = (unitAreaId?: number) =>
  useQuery({
    queryKey: keys.equipment(unitAreaId ?? 0),
    queryFn: () => data(appApi.areaEquipment(unitAreaId!)),
    enabled: !!unitAreaId,
    staleTime: 10 * 60_000,
  });

export const useEquipmentProblems = (equipmentId?: number) =>
  useQuery({
    queryKey: keys.problems(equipmentId ?? 0),
    queryFn: () => data(appApi.equipmentProblems(equipmentId!)),
    enabled: !!equipmentId,
    staleTime: 10 * 60_000,
  });

export const useNotifications = () =>
  useQuery({ queryKey: keys.notifications, queryFn: () => data(appApi.notifications()) });

// Una solicitud: arranca con la de la lista (si ya está en caché) y se refresca.
export const useRequest = (id: number) => {
  const qc = useQueryClient();
  return useQuery({
    queryKey: keys.request(id),
    queryFn: () => data(appApi.request(id)),
    initialData: () => qc.getQueryData<Request[]>(keys.requests)?.find((r) => r.id === id),
    initialDataUpdatedAt: () => qc.getQueryState(keys.requests)?.dataUpdatedAt,
  });
};

export const useThreads = () => useQuery({ queryKey: keys.threads, queryFn: () => data(appApi.messageSummary()) });

// Hilo del reporte; leerlo marca como leídos los del equipo. Se refresca solo
// mientras la pantalla está abierta.
export const useMessages = (id: number) =>
  useQuery({ queryKey: keys.messages(id), queryFn: () => data(appApi.messages(id)), refetchInterval: 15_000 });

export const useFolders = () => useQuery({ queryKey: keys.folders, queryFn: () => data(appApi.folders()) });

export const useDocuments = (folderId: number) =>
  useQuery({ queryKey: keys.documents(folderId), queryFn: () => data(appApi.documents(folderId)) });

export const useMembers = () => useQuery({ queryKey: keys.members, queryFn: () => data(appApi.members()) });
