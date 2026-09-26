import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import type { useRouter } from 'expo-router';
import { InteractionManager, Platform } from 'react-native';

import { appApi } from '@/api/app';

// Avisos visibles aunque la app esté abierta.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const projectId = Constants.expoConfig?.extra?.eas?.projectId as string | undefined;

// Registra el token de Expo en la API. ask=false solo lo hace si el permiso ya
// estaba dado (arranque); ask=true lo pide (después del primer reporte).
export async function registerPush(ask: boolean): Promise<void> {
  // El simulador de iOS no recibe push; el emulador de Android con Play sí.
  if ((Platform.OS === 'ios' && !Device.isDevice) || !projectId) return;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
  let { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted' && ask) status = (await Notifications.requestPermissionsAsync()).status;
  if (status !== 'granted') return;
  try {
    const { data } = await Notifications.getExpoPushTokenAsync({ projectId });
    await appApi.pushToken(data);
  } catch (e) {
    if (__DEV__) console.warn('[push] token', e);
    // Sin Firebase (variante dev) o sin red: se reintenta en el próximo arranque.
  }
}

type PushData = { screen?: string; requestId?: number | string };

// Destino de un aviso (data de api-go: messages, rating, Notificaciones o
// solo screen para los avisos generales).
export function pushTarget(data: PushData | undefined): string {
  const id = Number(data?.requestId);
  if (!id) return '/notifications';
  if (data?.screen === 'messages') return `/reports/${id}/messages`;
  return `/reports/${id}`;
}

// Tocar un aviso abre su pantalla, también con la app cerrada (arranque en
// frío). En frío la respuesta llega mientras el router todavía resuelve la
// ruta inicial y en release (más rápido que dev) un push inmediato se pierde:
// se espera a que termine la primera interacción y un momento más. Cada aviso
// se abre una sola vez (el layout puede volver a montarse).
let handled: string | null = null;
const COLD_START_DELAY = 400;

export function listenPushTaps(router: ReturnType<typeof useRouter>): () => void {
  const open = (r: Notifications.NotificationResponse | null, cold: boolean) => {
    if (!r) return;
    const id = r.notification.request.identifier;
    if (id === handled) return;
    handled = id;
    const target = pushTarget(r.notification.request.content.data as PushData);
    const go = () => router.push(target as never);
    if (!cold) return go();
    InteractionManager.runAfterInteractions(() => setTimeout(go, COLD_START_DELAY));
  };
  void Notifications.getLastNotificationResponseAsync().then((r) => open(r, true));
  const sub = Notifications.addNotificationResponseReceivedListener((r) => open(r, false));
  return () => sub.remove();
}
