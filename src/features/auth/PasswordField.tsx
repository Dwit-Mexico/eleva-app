import { Check, Circle, Eye, EyeOff, Lock } from 'lucide-react-native';
import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View, type TextInput, type TextInputProps } from 'react-native';

import { Field, useTheme } from '@/ui';

import { passwordRules } from './password';

type Props = TextInputProps & { label: string; error?: string };

export const PasswordField = forwardRef<TextInput, Props>(function PasswordField(props, ref) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const [visible, setVisible] = useState(false);
  const Icon = visible ? EyeOff : Eye;
  return (
    <Field
      ref={ref}
      icon={Lock}
      secureTextEntry={!visible}
      autoCapitalize="none"
      autoCorrect={false}
      {...props}
      right={
        <Pressable
          onPress={() => setVisible((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={visible ? t('auth.hidePassword') : t('auth.showPassword')}
          className="-mr-2 h-11 w-11 items-center justify-center"
        >
          <Icon size={20} color={palette.textMute} strokeWidth={2} />
        </Pressable>
      }
    />
  );
});

// Lista de requisitos que se van palomeando mientras se escribe.
export function PasswordRules({ value }: { value: string }) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const rules = [
    { ok: passwordRules.length(value), label: t('auth.rule1') },
    { ok: passwordRules.letterAndNumber(value), label: t('auth.rule2') },
  ];
  return (
    <View className="gap-2">
      {rules.map((r) => (
        <View key={r.label} className="flex-row items-center gap-2" accessible accessibilityState={{ checked: r.ok }}>
          {r.ok ? (
            <Check size={16} color={palette.success} strokeWidth={2} />
          ) : (
            <Circle size={16} color={palette.textMute} strokeWidth={2} />
          )}
          <Text className="text-[13px] leading-[18px] text-text-soft">{r.label}</Text>
        </View>
      ))}
    </View>
  );
}
