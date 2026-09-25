import { Pressable, Text } from 'react-native';

type Props = { label: string; selected?: boolean; onPress?: () => void; disabled?: boolean };

// Alto mínimo 44, ancho según contenido. Van en fila que envuelve con gap 8.
export function Chip({ label, selected, onPress, disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ selected: !!selected, disabled: !!disabled }}
      className={`min-h-11 justify-center rounded-sm border px-4 py-[11px] ${selected ? 'border-brand bg-brand' : 'border-border bg-surface-2'} ${disabled ? 'opacity-40' : ''} active:opacity-80`}
    >
      <Text className={`text-body ${selected ? 'font-semibold text-ink' : 'text-text'}`}>{label}</Text>
    </Pressable>
  );
}
