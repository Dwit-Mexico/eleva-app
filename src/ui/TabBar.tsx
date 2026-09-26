import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { ClipboardList, FolderOpen, House, UserRound, type LucideIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from './ThemeProvider';

const icons: Record<string, LucideIcon> = {
  index: House,
  reports: ClipboardList,
  documents: FolderOpen,
  profile: UserRound,
};
const labels: Record<string, 'tabs.home' | 'tabs.reports' | 'tabs.documents' | 'tabs.profile'> = {
  index: 'tabs.home',
  reports: 'tabs.reports',
  documents: 'tabs.documents',
  profile: 'tabs.profile',
};

// Tamaño fijo en px: no escala con el tamaño de texto de la app (la barra
// debe caber siempre en una línea).
// Cuatro destinos con ícono y etiqueta. Activo: brand-soft sobre brand-tint.
// `dots` marca con un punto warning las pestañas con acción pendiente.
export function TabBar({
  state,
  navigation,
  dots = {},
}: BottomTabBarProps & { dots?: Record<string, boolean> }) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-row border-t border-surface-1 bg-bg px-[8px] pt-[8px]"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}
      accessibilityRole="tablist"
    >
      {state.routes.map((route, i) => {
        const focused = state.index === i;
        const Icon = icons[route.name] ?? House;
        const key = labels[route.name];
        const label = key ? t(key) : route.name;
        const color = focused ? palette.brandSoft : palette.textMute;
        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={label}
            onPress={() => {
              const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
            }}
            className={`min-h-[52px] flex-1 items-center justify-center gap-[4px] rounded-md ${focused ? 'bg-brand-tint' : ''}`}
          >
            <View>
              <Icon size={22} color={color} strokeWidth={2} />
              {dots[route.name] ? (
                <View className="absolute -right-[4px] -top-[2px] h-[8px] w-[8px] rounded-pill bg-warning" />
              ) : null}
            </View>
            <Text
              numberOfLines={1}
              maxFontSizeMultiplier={1.3}
              className={`text-[11px] font-medium leading-[14px] ${focused ? 'text-brand-soft' : 'text-text-mute'}`}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
