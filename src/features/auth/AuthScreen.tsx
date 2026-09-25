import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Logo } from '@/ui';

type Props = {
  title?: string;
  description?: string;
  logo?: boolean;
  top?: ReactNode; // p. ej. el selector de idioma del login
  header?: ReactNode; // Header con back en recuperación
  children: ReactNode;
};

// Marco de las pantallas de acceso: fondo sólido, margen 20 y el teclado sin
// tapar el botón.
export function AuthScreen({ title, description, logo, top, header, children }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      {header}
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 gap-6 px-5 pb-8 pt-4">
            {top}
            {logo ? (
              <View className="items-center pt-6">
                <Logo />
              </View>
            ) : null}
            {title || description ? (
              <View className={`gap-2 ${logo ? 'items-center' : ''}`}>
                {title ? (
                  <Text
                    className={`text-title font-semibold text-text ${logo ? 'text-center' : ''}`}
                    accessibilityRole="header"
                  >
                    {title}
                  </Text>
                ) : null}
                {description ? (
                  <Text className={`text-body text-text-soft ${logo ? 'text-center' : ''}`}>{description}</Text>
                ) : null}
              </View>
            ) : null}
            {children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
