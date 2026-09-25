import { useTranslation } from 'react-i18next';
import { Linking, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AppConfig } from '@/api/schemas';
import { Button, Logo } from '@/ui';

// Bloquea la app cuando su versión es menor que minVersion (GET /app/config).
export function UpdateRequired({ config }: { config: AppConfig }) {
  const { t } = useTranslation();
  const url = Platform.OS === 'ios' ? config.storeUrls.ios : config.storeUrls.android;
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="flex-1 items-center justify-center gap-5 px-5">
        <Logo />
        <Text className="text-center text-title font-semibold text-text" accessibilityRole="header">
          {t('update.title')}
        </Text>
        <Text className="text-center text-body text-text-soft">{t('update.body')}</Text>
        <Button label={t('update.cta')} onPress={() => void Linking.openURL(url)} fullWidth />
      </View>
    </SafeAreaView>
  );
}
