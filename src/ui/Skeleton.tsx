import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from './ThemeProvider';

// Bloque de carga: pulsa entre surface-1 y surface-2 en 1.2 s.
export function Skeleton({ height = 88, radius = 12 }: { height?: number; radius?: number }) {
  const { t: tr } = useTranslation();
  const { palette } = useTheme();
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withRepeat(withTiming(1, { duration: 600 }), -1, true);
  }, [t]);
  const style = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(t.value, [0, 1], [palette.surface1, palette.surface2]),
  }));
  return (
    <Animated.View
      accessibilityRole="progressbar"
      accessibilityLabel={tr('common.loading')}
      style={[{ height, borderRadius: radius }, style]}
    />
  );
}
