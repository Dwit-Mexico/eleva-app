import { UserRound } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { EmptyState, Header, Screen } from '@/ui';

// Provisional (fase 1).
export default function Tab() {
  const { t } = useTranslation();
  return (
    <Screen header={<Header title={t('tabs.profile')} />}>
      <EmptyState icon={UserRound} title={t('tabs.profile')} text="Pantalla en construcción." />
    </Screen>
  );
}
