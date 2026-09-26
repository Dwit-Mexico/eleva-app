import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

type Tone = 'info' | 'success' | 'danger' | 'warning' | 'neutral';

// IdEstado → color semántico (nunca el dorado). 10 "en pausa" no está en el
// diseño: se muestra neutro.
const tones: Record<number, Tone> = {
  1: 'info',
  2: 'success',
  3: 'danger',
  4: 'info',
  5: 'success',
  6: 'neutral',
  7: 'warning',
  8: 'warning',
  9: 'neutral',
  10: 'neutral',
};

const fill: Record<Tone, string> = {
  info: 'bg-info',
  success: 'bg-success',
  danger: 'bg-danger',
  warning: 'bg-warning',
  neutral: 'border border-border bg-surface-2',
};

export function statusTone(statusId: number): Tone {
  return tones[statusId] ?? 'neutral';
}

export function StatusBadge({ statusId }: { statusId: number }) {
  const { t } = useTranslation();
  const tone = statusTone(statusId);
  return (
    <View className={`min-h-[1.375rem] justify-center self-start rounded-pill px-[0.5625rem] py-0.5 ${fill[tone]}`}>
      <Text className={`text-label font-semibold tracking-[0.24px] ${tone === 'neutral' ? 'text-text-soft' : 'text-ink'}`}>
        {t(`status.${statusId}` as 'status.1', { defaultValue: `#${statusId}` })}
      </Text>
    </View>
  );
}
