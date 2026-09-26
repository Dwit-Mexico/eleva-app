import { Tabs, useRootNavigationState, useRouter } from 'expo-router';
import { useEffect } from 'react';

import { useRequests } from '@/api/queries';
import { listenPushTaps, registerPush } from '@/features/push/push';
import { useActiveUnit } from '@/store/activeUnit';
import { TabBar } from '@/ui';

// Tab bar propia del rediseño. Punto en Reportes cuando hay algo por valorar
// o por agendar en la vivienda activa.
export default function TabsLayout() {
  const router = useRouter();
  const ready = !!useRootNavigationState()?.key;
  // Con sesión: renueva el token si ya hay permiso y abre el destino de los
  // avisos que se toquen (cuando la navegación ya está montada).
  useEffect(() => {
    if (!ready) return undefined;
    void registerPush(false);
    return listenPushTaps(router);
  }, [ready, router]);
  const { unit } = useActiveUnit();
  const pending = (useRequests().data ?? []).some(
    (r) =>
      (!unit || r.unit.id === unit.unitId) &&
      (r.canRate || (r.status.id === 4 && (r.proposedDates?.length ?? 0) > 0)),
  );
  return (
    <Tabs
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: 'transparent' } }}
      tabBar={(props) => <TabBar {...props} dots={{ reports: pending }} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="reports" />
      <Tabs.Screen name="documents" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
