import '../global.css';
import '@/i18n';

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import Constants from 'expo-constants';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { authApi } from '@/api/auth';
import type { AppConfig } from '@/api/schemas';
import { OfflineSheet } from '@/features/offline/guard';
import { UpdateRequired } from '@/features/update/UpdateRequired';
import '@/lib/online';
import { persistOptions, queryClient } from '@/lib/queryClient';
import { isBelow } from '@/lib/version';
import { usePrefs } from '@/store/prefs';
import { useSession } from '@/store/session';
import { ThemeProvider } from '@/ui';
import type { ThemeName } from '@/ui/tokens';

void SplashScreen.preventAutoHideAsync();

const APP_VERSION = Constants.expoConfig?.version ?? '0.0.0';

export default function RootLayout() {
  const system = useColorScheme();
  const pref = usePrefs((s) => s.theme);
  const theme: ThemeName = pref === 'system' ? (system === 'light' ? 'cream' : 'dark') : pref;
  const status = useSession((s) => s.status);
  const hydrate = useSession((s) => s.hydrate);
  const [config, setConfig] = useState<AppConfig | null>(null);

  useEffect(() => {
    void hydrate();
    // Sin red no se bloquea: se revisa la próxima vez que abra.
    authApi
      .config()
      .then(({ data }) => setConfig(data))
      .catch(() => {});
  }, [hydrate]);

  useEffect(() => {
    if (status !== 'loading') void SplashScreen.hideAsync();
  }, [status]);

  if (status === 'loading') return null;
  const signedIn = status === 'signedIn';
  const mustUpdate = config ? isBelow(APP_VERSION, config.minVersion) : false;

  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
        <ThemeProvider name={theme}>
          <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
          {mustUpdate && config ? (
            <UpdateRequired config={config} />
          ) : (
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
              <Stack.Protected guard={signedIn}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="notifications" />
                <Stack.Screen name="dev/components" />
              </Stack.Protected>
              <Stack.Protected guard={!signedIn}>
                <Stack.Screen name="(auth)" />
              </Stack.Protected>
            </Stack>
          )}
          {mustUpdate ? null : <OfflineSheet />}
        </ThemeProvider>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}
