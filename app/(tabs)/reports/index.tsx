import { ClipboardList } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { EmptyState, Header, Screen } from '@/ui';

// Provisional (fase 1).
export default function Tab() {
  const { t } = useTranslation();
  return (
    <Screen header={<Header title={t('tabs.reports')} />}>
      <EmptyState icon={ClipboardList} title={t('tabs.reports')} text="Pantalla en construcción." />
    </Screen>
  );
}
