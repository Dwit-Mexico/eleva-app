import { Image } from 'expo-image';

import { useTheme } from './ThemeProvider';

// logo2 tiene letras blancas (fondo oscuro); logo2-light, letras oscuras (crema).
export function Logo({ size = 104 }: { size?: number }) {
  const { name } = useTheme();
  return (
    <Image
      source={name === 'dark' ? require('../../assets/logo2.png') : require('../../assets/logo2-light.png')}
      style={{ width: size, height: size }}
      contentFit="contain"
      accessibilityLabel="Eleva"
    />
  );
}
