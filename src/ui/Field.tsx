import type { LucideIcon } from 'lucide-react-native';
import { forwardRef, useState } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';

import { ErrorMessage } from './ErrorMessage';
import { useTheme } from './ThemeProvider';

type Props = TextInputProps & {
  label: string;
  icon?: LucideIcon;
  hint?: string;
  error?: string;
  right?: React.ReactNode; // p. ej. botón de mostrar/ocultar contraseña
};

// Label arriba, caja de 52, surface-2. Foco: borde brand + halo de 3 px al 25 %.
// Error: borde danger y mensaje con ícono.
export const Field = forwardRef<TextInput, Props>(function Field(
  { label, icon: Icon, hint, error, right, onFocus, onBlur, multiline, ...input },
  ref,
) {
  const { palette } = useTheme();
  const [focused, setFocused] = useState(false);
  const border = error ? 'border-danger' : focused ? 'border-brand' : 'border-border';
  return (
    <View className="gap-1.5">
      <Text className="text-label font-medium text-text-soft">{label}</Text>
      <View className={`rounded-[11px] border-[3px] ${focused && !error ? 'border-brand/25' : 'border-transparent'} -m-[3px]`}>
        <View
          className={`${multiline ? 'min-h-[7.5rem] items-start py-3' : 'h-13 items-center'} flex-row gap-2.5 rounded-sm border bg-surface-2 px-3.5 ${border}`}
        >
          {Icon ? <Icon size={18} color={palette.textMute} strokeWidth={2} /> : null}
          <TextInput
            ref={ref}
            {...input}
            multiline={multiline}
            accessibilityLabel={label}
            placeholderTextColor={palette.textMute}
            selectionColor={palette.brand}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            className={`flex-1 text-body text-text ${multiline ? 'min-h-[6rem]' : ''}`}
            style={multiline ? { textAlignVertical: 'top' } : undefined}
          />
          {right}
        </View>
      </View>
      {error ? (
        <ErrorMessage message={error} />
      ) : hint ? (
        <Text className="text-label text-text-mute">{hint}</Text>
      ) : null}
    </View>
  );
});
