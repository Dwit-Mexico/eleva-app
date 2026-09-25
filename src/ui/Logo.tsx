import { Image } from 'expo-image';

import { useTheme } from './ThemeProvider';

// logo2 tiene letras blancas (para fondo oscuro); en crema se usa el ícono de la app (appstore.png), con
// fondo negro para no perder el contraste.
export function Logo({ size = 104 }: { size?: number }) {
  const { name } = useTheme();
  return (
    <Image
      source={name === 'dark' ? require('../../assets/logo2.png') : require('../../assets/appstore.png')}
      style={{ width: size, height: size, borderRadius: name === 'dark' ? 0 : size * 0.22 }}
      contentFit="contain"
      accessibilityLabel="Eleva"
    />
  );
}
