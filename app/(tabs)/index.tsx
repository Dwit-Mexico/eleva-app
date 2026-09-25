import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import { BellButton, Header, Screen } from '@/ui';

// Inicio provisional (fase 1). El contenido real llega en la fase 3.
export default function Home() {
  const { t } = useTranslation();
  return (
    <Screen header={<Header title={t('tabs.home')} right={<BellButton unread onPress={() => {}} />} />}>
      <Text className="text-body text-text-soft">Eleva Customer Service · v4 en construcción</Text>
      {__DEV__ ? (
        <Link href="/dev/components" className="text-body font-semibold text-brand-soft">
          Catálogo de componentes (dev)
        </Link>
      ) : null}
    </Screen>
  );
}
