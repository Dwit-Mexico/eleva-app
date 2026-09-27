import * as Updates from 'expo-updates';
import { Sparkles, X } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/ui';

// Aviso flotante sobre la tab bar cuando ya se descargó una actualización OTA.
// "Aplicar" reinicia la app al momento; si se cierra, se aplica sola en el
// siguiente arranque.
export function UpdateToast() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const insets = useSafeAreaInsets();
  const { isUpdatePending } = Updates.useUpdates();
  const [hidden, setHidden] = useState(false);
  if (!isUpdatePending || hidden) return null;
  return (
    <View
      pointerEvents="box-none"
      style={{ position: 'absolute', left: 0, right: 0, bottom: insets.bottom + 76 }}
      className="px-4"
    >
      <View
        accessibilityRole="alert"
        className="flex-row items-center gap-3 rounded-md border border-border bg-surface-2 py-2 pl-4 pr-2"
      >
        <Sparkles size={18} color={palette.brandSoft} strokeWidth={2} />
        <Text className="flex-1 text-caption font-medium text-text">{t('update.otaTitle')}</Text>
        <Pressable
          onPress={() => void Updates.reloadAsync()}
          accessibilityRole="button"
          className="min-h-9 justify-center rounded-pill bg-brand px-3.5 active:opacity-80"
        >
          <Text className="text-caption font-semibold text-ink">{t('update.otaCta')}</Text>
        </Pressable>
        <Pressable
          onPress={() => setHidden(true)}
          accessibilityRole="button"
          accessibilityLabel={t('update.dismiss')}
          hitSlop={8}
          className="h-9 w-9 items-center justify-center"
        >
          <X size={16} color={palette.textMute} strokeWidth={2} />
        </Pressable>
      </View>
    </View>
  );
}
