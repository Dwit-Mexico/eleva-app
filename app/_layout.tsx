import '../global.css';
import '@/i18n';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { usePrefs } from '@/store/prefs';
import { ThemeProvider } from '@/ui';
import type { ThemeName } from '@/ui/tokens';

export default function RootLayout() {
  // Por defecto sigue al sistema: oscuro → dark, claro → cream.
  const system = useColorScheme();
  const pref = usePrefs((s) => s.theme);
  const theme: ThemeName = pref === 'system' ? (system === 'light' ? 'cream' : 'dark') : pref;
  return (
    <SafeAreaProvider>
      <ThemeProvider name={theme}>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
