import { useRouter } from 'expo-router';
import { Bell, ChevronLeft } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from './ThemeProvider';

type HeaderProps = {
  title: string;
  subtitle?: string;
  back?: boolean | (() => void);
  right?: ReactNode;
};

// Back 44 × 44 en brand-soft, título 22/600, subtítulo 13 y acción a la derecha.
export function Header({ title, subtitle, back, right }: HeaderProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const { palette } = useTheme();
  return (
    <View className="flex-row items-center gap-2 border-b border-surface-1 px-5 pb-3 pt-4">
      {back ? (
        <Pressable
          onPress={typeof back === 'function' ? back : () => router.back()}
          accessibilityRole="button"
          accessibilityLabel={t('common.back')}
          className="-ml-3 h-11 w-11 items-center justify-center"
        >
          <ChevronLeft size={24} color={palette.brandSoft} strokeWidth={2} />
        </Pressable>
      ) : null}
      <View className="flex-1">
        <Text className="text-title font-semibold text-text" accessibilityRole="header">
          {title}
        </Text>
        {subtitle ? <Text className="text-caption text-text-soft">{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

// Campana del Inicio con punto cuando hay avisos sin leer.
export function BellButton({ unread, onPress }: { unread?: boolean; onPress: () => void }) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={unread ? t('common.unreadNotifications') : t('common.notifications')}
      className="h-11 w-11 items-center justify-center"
    >
      <Bell size={22} color={palette.text} strokeWidth={2} />
      {unread ? <View className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-pill bg-brand" /> : null}
    </Pressable>
  );
}

type ScreenProps = {
  children: ReactNode;
  header?: ReactNode;
  banner?: ReactNode;
  scroll?: boolean;
  footer?: ReactNode; // barra fija inferior (wizard)
  onRefresh?: () => void; // jalar para actualizar
  refreshing?: boolean;
  bodyClassName?: string; // reemplaza el padding y gap del cuerpo (lista: segmentos a todo lo ancho)
};

// Fondo sólido bg (sin foto), margen lateral 20.
export function Screen({ children, header, banner, scroll = true, footer, onRefresh, refreshing, bodyClassName }: ScreenProps) {
  const { palette } = useTheme();
  // padding 16 20 28 y gap 20, como el contenedor de cada pantalla del prototipo.
  const body = <View className={bodyClassName ?? 'gap-5 px-5 pb-7 pt-4'}>{children}</View>;
  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-bg">
      {header}
      {banner}
      {scroll ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={!!refreshing}
                onRefresh={onRefresh}
                tintColor={palette.brandSoft}
                colors={[palette.brand]}
                progressBackgroundColor={palette.surface2}
              />
            ) : undefined
          }
        >
          {body}
        </ScrollView>
      ) : (
        <View className="flex-1">{body}</View>
      )}
      {footer ? <View className="border-t border-surface-1 bg-bg px-5 pb-6 pt-3">{footer}</View> : null}
    </SafeAreaView>
  );
}
