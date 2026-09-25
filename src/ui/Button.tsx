import type { LucideIcon } from 'lucide-react-native';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { useTheme } from './ThemeProvider';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: 'lg' | 'md';
  icon?: LucideIcon;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  accessibilityHint?: string;
};

const box: Record<ButtonVariant, string> = {
  primary: 'bg-brand',
  secondary: 'border border-border',
  ghost: '',
  danger: 'border border-danger',
};
const text: Record<ButtonVariant, string> = {
  primary: 'text-ink',
  secondary: 'text-text',
  ghost: 'text-brand-soft',
  danger: 'text-danger',
};

// Un solo primary (dorado) por pantalla. Loading muestra solo el spinner.
export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  icon: Icon,
  disabled,
  loading,
  fullWidth,
  accessibilityHint,
}: Props) {
  const { palette } = useTheme();
  const tint = {
    primary: palette.ink,
    secondary: palette.text,
    ghost: palette.brandSoft,
    danger: palette.danger,
  }[variant];
  const inactive = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
      className={`${size === 'lg' ? 'min-h-13 px-6' : 'min-h-11 px-5'} flex-row items-center justify-center gap-2 rounded-md ${box[variant]} ${fullWidth ? 'self-stretch' : ''} ${disabled ? 'opacity-40' : ''} active:opacity-80`}
    >
      {loading ? (
        <ActivityIndicator color={tint} />
      ) : (
        <View className="flex-row items-center gap-2">
          {Icon ? <Icon size={20} color={tint} strokeWidth={2} /> : null}
          <Text className={`${size === 'lg' ? 'text-[16px]' : 'text-body'} font-semibold ${text[variant]}`}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
