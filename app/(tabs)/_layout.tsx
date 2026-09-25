import { Tabs } from 'expo-router';

import { TabBar } from '@/ui';

// Tab bar propia del rediseño. El punto de Reportes (algo por valorar o
// agendar) se conecta a los datos en la fase 4.
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: 'transparent' } }}
      tabBar={(props) => <TabBar {...props} dots={{ reports: true }} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="reports" />
      <Tabs.Screen name="documents" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
