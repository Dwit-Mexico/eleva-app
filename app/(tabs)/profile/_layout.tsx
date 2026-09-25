import { Stack } from 'expo-router';

// Pila de la pestaña: las pantallas de adentro conservan la tab bar (como en
// el prototipo, tabDefs.screens).
export const unstable_settings = { initialRouteName: 'index' };

export default function TabStack() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }} />;
}
