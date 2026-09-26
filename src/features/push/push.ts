import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import type { useRouter } from 'expo-router';
import { Platform } from 'react-native';

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
// frío). En frío la respuesta llega antes de que el router termine de montar:
// quien llama espera a que la navegación esté lista y aquí se difiere un
// tick. Cada aviso se abre una sola vez (el layout puede volver a montarse).
let handled: string | null = null;

export function listenPushTaps(router: ReturnType<typeof useRouter>): () => void {
  const open = (r: Notifications.NotificationResponse | null) => {
    if (!r) return;
    const id = r.notification.request.identifier;
    if (id === handled) return;
    handled = id;
    const target = pushTarget(r.notification.request.content.data as PushData);
    setTimeout(() => router.push(target as never), 0);
  };
  void Notifications.getLastNotificationResponseAsync().then(open);
  const sub = Notifications.addNotificationResponseReceivedListener(open);
  return () => sub.remove();
}
