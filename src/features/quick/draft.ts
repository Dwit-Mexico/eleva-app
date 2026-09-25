import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Media } from '@/features/media/media';
import { zustandStorage } from '@/lib/storage';

// Borrador del reporte rápido (prototipo: draftOpen): salir a medias no tira
// el trabajo; el Inicio ofrece retomarlo. Nunca se envía solo.
export type QuickDraft = { media: Media[]; areaId: number | null; note: string };

type State = {
  draft: QuickDraft | null;
  save: (d: QuickDraft) => void;
  clear: () => void;
};

export const useQuickDraft = create<State>()(
  persist(
    (set) => ({
      draft: null,
      save: (d) => set({ draft: d.media.length || d.areaId !== null || d.note.trim() ? d : null }),
      clear: () => set({ draft: null }),
    }),
    { name: 'quick-draft', storage: createJSONStorage(() => zustandStorage) },
  ),
);
