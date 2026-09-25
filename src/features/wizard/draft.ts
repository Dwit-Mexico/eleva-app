import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { CatalogItem, UnitArea, UnitEquipment } from '@/api/schemas';
import type { Media } from '@/features/media/media';
import { zustandStorage } from '@/lib/storage';

// Borrador del wizard guiado. Se guarda en cada paso (sobrevive a cerrar la
// app) pero nunca se envía solo: el Inicio ofrece retomarlo.
export type Draft = {
  unitId?: number;
  area?: UnitArea;
  equipment?: UnitEquipment;
  problem?: CatalogItem;
  description: string;
  media: Media[];
  step: number;
};

type State = {
  draft: Draft | null;
  update: (p: Partial<Draft>) => void;
  clear: () => void;
};

const empty: Draft = { description: '', media: [], step: 0 };

export const useDraft = create<State>()(
  persist(
    (set) => ({
      draft: null,
      update: (p) => set((s) => ({ draft: { ...(s.draft ?? empty), ...p } })),
      clear: () => set({ draft: null }),
    }),
    { name: 'wizard-draft', storage: createJSONStorage(() => zustandStorage) },
  ),
);

// Cambiar el área limpia equipo y problema; cambiar el equipo limpia el problema.
export function withArea(area: UnitArea): Partial<Draft> {
  return { area, equipment: undefined, problem: undefined };
}
export function withEquipment(equipment: UnitEquipment): Partial<Draft> {
  return { equipment, problem: undefined };
}
