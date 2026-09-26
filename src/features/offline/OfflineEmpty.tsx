import { CloudOff } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { EmptyState } from '@/ui';

// Sin conexión y sin nada guardado de esta pantalla (nunca se abrió con red):
// en vez de un "vacío" que engaña, se explica por qué no hay datos.
export function OfflineEmpty() {
  const { t } = useTranslation();
  return (
    <EmptyState bare icon={CloudOff} title={t('offline.notSavedTitle')} text={t('offline.notSavedBody')} />
  );
}

// La consulta está en pausa por falta de red y no tiene datos en caché.
export const pausedWithoutData = (q: { data?: unknown; fetchStatus: string }) =>
  q.data === undefined && q.fetchStatus === 'paused';
