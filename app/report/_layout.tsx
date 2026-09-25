import { Stack } from 'expo-router';

// El flujo de reportar oculta la tab bar (pantallas completas).
export default function ReportLayout() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }} />;
}
