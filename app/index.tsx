import { Image } from 'expo-image';
import { Text, View } from 'react-native';

// Pantalla provisional de la fase 0: confirma que el tema y NativeWind cargan.
export default function Home() {
  return (
    <View className="flex-1 items-center justify-center gap-4 px-5">
      <Image source={require('../assets/logo.png')} style={{ width: 104, height: 104 }} contentFit="contain" />
      <Text className="text-title font-semibold text-text">Eleva</Text>
      <Text className="text-body text-text-soft">Customer Service · v4 en construcción</Text>
      <View className="rounded-md bg-brand px-4 py-3">
        <Text className="text-body font-semibold text-ink">Reportar un detalle</Text>
      </View>
    </View>
  );
}
