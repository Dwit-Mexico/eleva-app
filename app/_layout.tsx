import '../global.css';
import '@/i18n';

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { OfflineSheet } from '@/features/offline/guard';
import { mustUpdate, useAppConfig } from '@/features/update/appConfig';
import { UpdateRequired } from '@/features/update/UpdateRequired';
import { UpdateToast } from '@/features/update/UpdateToast';
import { useUpdateChecks } from '@/features/update/useUpdateChecks';
import '@/lib/online';
import { persistOptions, queryClient } from '@/lib/queryClient';
import { usePrefs } from '@/store/prefs';
import { useSession } from '@/store/session';
import { ThemeProvider } from '@/ui';
import type { ThemeName } from '@/ui/tokens';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const system = useColorScheme();
  const pref = usePrefs((s) => s.theme);
  const theme: ThemeName = pref === 'system' ? (system === 'light' ? 'cream' : 'dark') : pref;
  const status = useSession((s) => s.status);
  const hydrate = useSession((s) => s.hydrate);
  const config = useAppConfig((s) => s.config);
  useUpdateChecks();

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (status !== 'loading') void SplashScreen.hideAsync();
  }, [status]);

  if (status === 'loading') return null;
  const signedIn = status === 'signedIn';
  const blocked = mustUpdate(config);

  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
        <ThemeProvider name={theme}>
          <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
          {blocked && config ? (
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
          {blocked ? null : <OfflineSheet />}
          {blocked || !signedIn ? null : <UpdateToast />}
        </ThemeProvider>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}
