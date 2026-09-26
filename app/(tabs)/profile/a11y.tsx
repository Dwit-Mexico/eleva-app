import { Check, Info } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { usePrefs, type TextScale } from '@/store/prefs';
import { Header, Screen, useTheme } from '@/ui';

const OPTIONS: { v: TextScale; label: string; hint: string; fs: number }[] = [
  { v: 1, label: 'profile.sizeNormal', hint: 'profile.sizeNormalH', fs: 15 },
  { v: 1.3, label: 'profile.sizeBig', hint: 'profile.sizeBigH', fs: 19 },
  { v: 1.6, label: 'profile.sizeHuge', hint: 'profile.sizeHugeH', fs: 24 },
];

// Tamaño de texto (prototipo: isA11y). Cada opción se muestra en su tamaño.
export default function TextSize() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { textScale, setTextScale } = usePrefs();
  return (
    <Screen header={<Header title={t('profile.a11y')} back />}>
      <Text className="text-body leading-[22px] text-text-soft">{t('profile.a11yIntro')}</Text>
      <View className="gap-2" accessibilityRole="radiogroup">
        {OPTIONS.map((o) => {
          const on = textScale === o.v;
          return (
            <Pressable
              key={o.v}
              onPress={() => setTextScale(o.v)}
              accessibilityRole="radio"
              accessibilityState={{ selected: on }}
              className={`min-h-16 flex-row items-center gap-3 rounded-md border bg-surface-1 px-4 py-3.5 ${on ? 'border-brand' : 'border-border'}`}
            >
              <View className="min-w-0 flex-1">
                <Text
                  style={{ fontSize: o.fs, lineHeight: Math.round(o.fs * 1.4) }}
                  className="font-semibold text-text"
                >
                  {t(o.label)}
                </Text>
                <Text className="mt-0.5 text-caption text-text-soft">{t(o.hint)}</Text>
              </View>
              {on ? <Check size={20} color={palette.brand} strokeWidth={2} /> : null}
            </Pressable>
          );
        })}
      </View>
      <View className="flex-row gap-2.5 rounded-md border border-border bg-surface-1 px-4 py-3.5">
        <Info size={18} color={palette.info} strokeWidth={2} style={{ marginTop: 2 }} />
        <Text className="flex-1 text-caption text-text-soft">{t('profile.a11yNote')}</Text>
      </View>
    </Screen>
  );
}
