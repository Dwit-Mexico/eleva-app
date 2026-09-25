import { Tabs } from 'expo-router';

import { useRequests } from '@/api/queries';
import { useActiveUnit } from '@/store/activeUnit';
import { TabBar } from '@/ui';

// Tab bar propia del rediseño. Punto en Reportes cuando hay algo por valorar
// o por agendar en la vivienda activa.
export default function TabsLayout() {
  const { unit } = useActiveUnit();
  const pending = (useRequests().data ?? []).some(
    (r) => (!unit || r.unit.id === unit.unitId) && (r.canRate || (r.status.id === 4 && (r.proposedDates?.length ?? 0) > 0)),
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
