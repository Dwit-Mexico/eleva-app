import { Stack } from 'expo-router';

// Bandeja fuera de las pestañas: sin tab bar, como en el prototipo.
export default function NotificationsStack() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
