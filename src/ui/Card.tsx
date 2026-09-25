import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

type Props = { children: ReactNode; onPress?: () => void; accessibilityLabel?: string; className?: string };

// surface-1 + borde + radio 12, padding 14 × 16. Sin sombra.
export function Card({ children, onPress, accessibilityLabel, className = '' }: Props) {
  const base = `rounded-md border border-border bg-surface-1 px-4 py-3.5 ${className}`;
  if (!onPress) return <View className={base}>{children}</View>;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className={`${base} active:opacity-80`}
    >
      {children}
    </Pressable>
  );
}
