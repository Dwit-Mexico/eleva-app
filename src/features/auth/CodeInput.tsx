import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, TextInput, View } from 'react-native';

import { useTheme } from '@/ui';

const LENGTH = 6;

// Código de 6 dígitos: un TextInput invisible (pega y autocompleta el código
// completo) dibujado como 6 casillas de 60 de alto; la actual con borde brand.
export function CodeInput({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: boolean }) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const input = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  return (
    <Pressable onPress={() => input.current?.focus()} accessible={false}>
      <View className="flex-row gap-2.5">
        {Array.from({ length: LENGTH }, (_, i) => {
          const current = focused && i === Math.min(value.length, LENGTH - 1);
          return (
            <View
              key={i}
              className={`h-15 flex-1 items-center justify-center rounded-sm border bg-surface-2 ${error ? 'border-danger' : current ? 'border-brand' : 'border-border'}`}
            >
              <Text className="text-[1.5rem] font-semibold text-text">{value[i] ?? ''}</Text>
            </View>
          );
        })}
      </View>
      <TextInput
        ref={input}
        value={value}
        onChangeText={(v) => onChange(v.replace(/\D/g, '').slice(0, LENGTH))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        maxLength={LENGTH}
        autoFocus
        accessibilityLabel={t('auth.code')}
        caretHidden
        selectionColor={palette.brand}
        className="absolute inset-0 opacity-0"
      />
    </Pressable>
  );
}
