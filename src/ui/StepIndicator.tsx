import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

// Barras de 4 px: completadas brand, actual brand-soft, pendientes border.
export function StepIndicator({ current, total }: { current: number; total: number }) {
  const { t } = useTranslation();
  return (
    <View
      className="gap-2"
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 1, max: total, now: current }}
    >
      <View className="flex-row gap-1">
        {Array.from({ length: total }, (_, i) => (
          <View
            key={i}
            className={`h-1 flex-1 rounded-pill ${i + 1 < current ? 'bg-brand' : i + 1 === current ? 'bg-brand-soft' : 'bg-border'}`}
          />
        ))}
      </View>
      <Text className="text-label text-text-mute">{t('common.step', { current, total })}</Text>
    </View>
  );
}
