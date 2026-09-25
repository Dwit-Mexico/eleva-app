import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, Text } from 'react-native';

import { BellButton, Header, Screen } from '@/ui';

// Inicio provisional (fase 1). El contenido real llega en la fase 3.
export default function Home() {
  const { t } = useTranslation();
  return (
    <Screen header={<Header title={t('tabs.home')} right={<BellButton unread onPress={() => {}} />} />}>
      <Text className="text-body text-text-soft">Eleva Customer Service · v4 en construcción</Text>
      {__DEV__ ? (
        // Link no pasa className de NativeWind: el estilo va en el hijo.
        <Link href="/dev/components" asChild>
          <Pressable accessibilityRole="link" className="min-h-11 justify-center">
            <Text className="text-body font-semibold text-brand-soft">Catálogo de componentes (dev)</Text>
          </Pressable>
        </Link>
      ) : null}
    </Screen>
  );
}
