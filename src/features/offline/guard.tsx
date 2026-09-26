import { useTranslation } from 'react-i18next';
import { create } from 'zustand';

import { isOnline } from '@/lib/online';
import { BottomSheet } from '@/ui';

const useSheet = create<{ open: boolean; set: (open: boolean) => void }>((set) => ({
  open: false,
  set: (open) => set({ open }),
}));

// Envuelve una acción que necesita red (enviar, agendar, calificar, cancelar,
// dar acceso): sin conexión abre la hoja "Necesitas internet para esto" y no
// la ejecuta. Lo escrito se conserva porque la pantalla no cambia.
export function needsNetwork<A extends unknown[]>(fn: (...args: A) => unknown) {
  return (...args: A) => {
    if (!isOnline()) {
      useSheet.getState().set(true);
      return;
    }
    return fn(...args);
  };
}

export function OfflineSheet() {
  const { t } = useTranslation();
  const { open, set } = useSheet();
  return (
    <BottomSheet
      visible={open}
      onClose={() => set(false)}
      title={t('offline.title')}
      body={t('offline.body')}
      hideCancel
      options={[{ label: t('offline.ok'), tone: 'primary', onPress: () => set(false) }]}
    />
  );
}
