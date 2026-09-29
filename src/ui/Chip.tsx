import { Pressable, Text } from 'react-native';
import { cn } from '../lib/cn';

type Props = { label: string; selected?: boolean; onPress?: () => void; disabled?: boolean };

// Alto mínimo 44, ancho según contenido. Van en fila que envuelve con gap 8.
export function Chip({ label, selected, onPress, disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ selected: !!selected, disabled: !!disabled }}
      className={cn(
        'min-h-11 justify-center rounded-sm border px-4 py-[0.6875rem]',
        {
          'border-brand bg-brand': selected,
          'border-border bg-surface-1': !selected,
          'opacity-40': disabled,
        },
        'active:opacity-80',
      )}
    >
      <Text className={cn('text-body', { 'font-semibold text-ink': selected, 'text-text': !selected })}>
        {label}
      </Text>
    </Pressable>
  );
}
