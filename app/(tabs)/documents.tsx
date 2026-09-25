import { FolderOpen } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { EmptyState, Header, Screen } from '@/ui';

// Provisional (fase 1).
export default function Tab() {
  const { t } = useTranslation();
  return (
    <Screen header={<Header title={t('tabs.documents')} />}>
      <EmptyState icon={FolderOpen} title={t('tabs.documents')} text="Pantalla en construcción." />
    </Screen>
  );
}
