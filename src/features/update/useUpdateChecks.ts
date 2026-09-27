import * as Updates from 'expo-updates';
import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';

import { useAppConfig } from './appConfig';

// Cada cuánto se vuelve a revisar al regresar del segundo plano.
const RECHECK_MS = 15 * 60 * 1000;

// Al abrir y al volver del segundo plano (si pasó un rato): refresca
// /app/config y busca una actualización OTA; si hay, la descarga para que el
// aviso "Hay una mejora lista" pueda aplicarla (expo-updates solo revisa al
// arrancar en frío).
export function useUpdateChecks() {
  const refresh = useAppConfig((s) => s.refresh);
  const last = useRef(0);

  useEffect(() => {
    const check = async () => {
      if (Date.now() - last.current < RECHECK_MS) return;
      last.current = Date.now();
      void refresh();
      if (!Updates.isEnabled || __DEV__) return;
      try {
        const r = await Updates.checkForUpdateAsync();
        if (r.isAvailable) await Updates.fetchUpdateAsync();
      } catch {
        // sin red o sin servidor de updates: no pasa nada
      }
    };
    void check();
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') void check();
    });
    return () => sub.remove();
  }, [refresh]);
}
