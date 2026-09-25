import { Bell } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { EmptyState, Header, Screen } from '@/ui';

// Provisional (fase 3): la bandeja real llega en la fase 5.
export default function Notifications() {
  const { t } = useTranslation();
  return (
    <Screen header={<Header title={t('common.notifications')} back />}>
      <EmptyState icon={Bell} title={t('common.notifications')} text="Pantalla en construcción." />
    </Screen>
  );
}
