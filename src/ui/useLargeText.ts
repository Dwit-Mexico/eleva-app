import { useWindowDimensions } from 'react-native';

import { usePrefs } from '@/store/prefs';

// Texto grande = letra del sistema × "Tamaño de texto" de la app. Arriba de
// ~1.25 los botones lado a lado ya no caben (una palabra se parte en sílabas),
// así que las pantallas los apilan.
export function useLargeText(threshold = 1.25): boolean {
  const { fontScale } = useWindowDimensions();
  const textScale = usePrefs((s) => s.textScale);
  return fontScale * textScale > threshold;
}
