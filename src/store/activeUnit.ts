import { useEffect } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { useUnits } from '@/api/queries';
import type { OwnerUnit } from '@/api/schemas';
import { zustandStorage } from '@/lib/storage';

// Vivienda activa: filtra contadores, recientes, próxima visita y listas, y es
// donde se crea el reporte nuevo. Con una sola vivienda no se muestra el cambio.
type State = { unitId: number | null; setUnit: (id: number) => void };

export const useActiveUnitStore = create<State>()(
  persist((set) => ({ unitId: null, setUnit: (unitId) => set({ unitId }) }), {
    name: 'active-unit',
    storage: createJSONStorage(() => zustandStorage),
  }),
);

export function useActiveUnit(): { unit: OwnerUnit | undefined; units: OwnerUnit[]; loading: boolean } {
  const { data: units = [], isLoading } = useUnits();
  const { unitId, setUnit } = useActiveUnitStore();
  const unit = units.find((u) => u.unitId === unitId) ?? units[0];
  useEffect(() => {
    if (unit && unit.unitId !== unitId) setUnit(unit.unitId);
  }, [unit, unitId, setUnit]);
  return { unit, units, loading: isLoading };
}
