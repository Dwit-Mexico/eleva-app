import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type SheetOption = {
  label: string;
  onPress: () => void;
  tone?: 'primary' | 'danger' | 'neutral';
};

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  body?: string;
  options: SheetOption[];
  cancelLabel?: string; // opción quiet al final; null para ocultarla
  hideCancel?: boolean;
};

const optionBox = {
  primary: 'bg-brand',
  danger: 'border border-danger',
  neutral: 'border border-border',
};
const optionText = {
  primary: 'text-ink font-semibold',
  danger: 'text-danger font-semibold',
  neutral: 'text-text',
};

// Hoja inferior para confirmaciones, elegir vivienda, cámara/galería, permisos
// y "sin conexión". surface-2, radio superior 20, opciones de 52 de alto.
export function BottomSheet({ visible, onClose, title, body, options, cancelLabel, hideCancel }: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const y = useSharedValue(400);
  useEffect(() => {
    y.value = withTiming(visible ? 0 : 400, { duration: 220 });
  }, [visible, y]);
  const style = useAnimatedStyle(() => ({ transform: [{ translateY: y.value }] }));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <Pressable className="flex-1 bg-black/60" onPress={onClose} accessibilityLabel={t('common.cancel')} />
      <Animated.View
        style={[style, { paddingBottom: Math.max(insets.bottom, 16) }]}
        className="gap-3 rounded-t-sheet border-t border-border bg-surface-2 px-5 pt-3"
        accessibilityViewIsModal
      >
        <View className="mb-1 h-1 w-10 self-center rounded-pill bg-border" />
        <Text className="text-title font-semibold text-text" accessibilityRole="header">
          {title}
        </Text>
        {body ? <Text className="text-body text-text-soft">{body}</Text> : null}
        <View className="gap-2 pt-1">
          {options.map((o) => (
            <Pressable
              key={o.label}
              onPress={o.onPress}
              accessibilityRole="button"
              className={`min-h-13 items-center justify-center rounded-md px-4 ${optionBox[o.tone ?? 'neutral']} active:opacity-80`}
            >
              <Text className={`text-[1rem] ${optionText[o.tone ?? 'neutral']}`}>{o.label}</Text>
            </Pressable>
          ))}
          {hideCancel ? null : (
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              className="min-h-13 items-center justify-center rounded-md active:opacity-80"
            >
              <Text className="text-[1rem] text-text-soft">{cancelLabel ?? t('common.cancel')}</Text>
            </Pressable>
          )}
        </View>
      </Animated.View>
    </Modal>
  );
}
