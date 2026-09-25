import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { themeStyles } from '@/ui/theme';
import type { ThemeName } from '@/ui/tokens';

export default function RootLayout() {
  // Por defecto sigue al sistema: oscuro → dark, claro → cream. La elección
  // manual (Perfil → Accesibilidad) llega en la fase 5.
  const theme: ThemeName = useColorScheme() === 'light' ? 'cream' : 'dark';
  return (
    <SafeAreaProvider>
      <View style={themeStyles[theme]} className="flex-1 bg-bg">
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }} />
      </View>
    </SafeAreaProvider>
  );
}
