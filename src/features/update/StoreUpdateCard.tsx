import { ArrowUpCircle, X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Linking, Pressable, Text, View } from 'react-native';

import { usePrefs } from '@/store/prefs';
import { useTheme } from '@/ui';

import { canUpdate, storeUrl, useAppConfig } from './appConfig';

// Tarjeta del Inicio cuando hay una versión de tienda más nueva que no es
// obligatoria. Cerrarla la oculta hasta que salga otra versión.
export function StoreUpdateCard() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const config = useAppConfig((s) => s.config);
  const { dismissedVersion, dismissVersion } = usePrefs();
  if (!config || !canUpdate(config) || dismissedVersion === config.latestVersion) return null;
  return (
    <View className="flex-row items-center gap-3 rounded-md border border-brand-soft bg-surface-1 px-4 py-3.5">
      <ArrowUpCircle size={20} color={palette.brandSoft} strokeWidth={2} />
      <Pressable
        onPress={() => void Linking.openURL(storeUrl(config))}
        accessibilityRole="button"
        className="min-w-0 flex-1 active:opacity-80"
      >
        <Text className="text-body text-text">{t('update.softTitle')}</Text>
        <Text className="mt-0.5 text-caption font-semibold text-brand-soft">{t('update.softCta')}</Text>
      </Pressable>
      <Pressable
        onPress={() => dismissVersion(config.latestVersion)}
        accessibilityRole="button"
        accessibilityLabel={t('update.dismiss')}
        hitSlop={8}
        className="h-9 w-9 items-center justify-center"
      >
        <X size={16} color={palette.textMute} strokeWidth={2} />
      </Pressable>
    </View>
  );
}
