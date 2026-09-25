import { Languages } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { currentLanguage, usePrefs } from '@/store/prefs';
import { Header, useTheme } from '@/ui';

type Props = {
  title?: string; // título del header; sin él (login) no hay header
  back?: boolean | (() => void);
  lang?: boolean; // píldora de idioma a la derecha del header
  description?: string;
  centered?: boolean; // login: contenido centrado vertical, margen 24
  children: ReactNode;
};

// Marco de las pantallas de acceso (prototipo: isLogin, isActivate, isRecover,
// isVerify). El teclado no tapa el botón.
export function AuthScreen({ title, back, lang, description, centered, children }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      {title !== undefined ? <Header title={title} back={back} right={lang ? <LanguagePill /> : undefined} /> : null}
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          {centered ? (
            <View className="flex-1 justify-center gap-5 px-6 pb-15">{children}</View>
          ) : (
            <View className="gap-5 px-5 pb-10 pt-5">
              {description ? <Text className="text-body leading-[22px] text-text-soft">{description}</Text> : null}
              {children}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ES ⇄ EN: píldora de 36 con borde e ícono de idiomas.
export function LanguagePill() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const setLanguage = usePrefs((s) => s.setLanguage);
  const lang = currentLanguage();
  return (
    <Pressable
      onPress={() => setLanguage(lang === 'es' ? 'en' : 'es')}
      accessibilityRole="button"
      accessibilityLabel={t('auth.language')}
      hitSlop={4}
      className="h-9 min-w-[60px] flex-row items-center justify-center gap-1.5 rounded-pill border border-border px-3 active:opacity-80"
    >
      <Languages size={15} color={palette.brandSoft} strokeWidth={2} />
      <Text className="text-[13px] font-semibold tracking-[0.26px] text-brand-soft">{lang.toUpperCase()}</Text>
    </Pressable>
  );
}

// Liga de texto centrada (¿Olvidaste tu contraseña?, reenviar código).
export function TextLink({ label, onPress, disabled }: { label: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      className="self-center p-3 active:opacity-70"
    >
      <Text className={disabled ? 'text-[13px] leading-[18px] text-text-mute' : 'text-[14px] text-brand-soft'}>
        {label}
      </Text>
    </Pressable>
  );
}
