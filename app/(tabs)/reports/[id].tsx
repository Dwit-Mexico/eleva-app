import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import { useRequests } from '@/api/queries';
import { requestLocation, requestTitle } from '@/features/requests/labels';
import { currentLanguage } from '@/store/prefs';
import { Header, Screen, StatusBadge } from '@/ui';

// Provisional (fase 3): el detalle completo (línea de tiempo, evidencia,
// agendar, valorar, mensajes) llega en la fase 4.
export default function RequestDetail() {
  const { t } = useTranslation();
  const lang = currentLanguage();
  const { id } = useLocalSearchParams<{ id: string }>();
  const r = useRequests().data?.find((x) => x.id === Number(id));
  return (
    <Screen header={<Header title={r?.folio ?? ''} back />}>
      {r ? (
        <>
          <StatusBadge statusId={r.status.id} />
          <Text className="text-title font-semibold text-text">{requestTitle(r, lang, t('report.quickTitle'))}</Text>
          <Text className="text-body text-text-soft">{requestLocation(r, lang)}</Text>
          {r.description ? <Text className="text-body text-text">{r.description}</Text> : null}
        </>
      ) : null}
    </Screen>
  );
}
