import { Image } from 'expo-image';
import { Camera, Check, Play, Video } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { useTheme } from './ThemeProvider';

type Props = {
  kind: 'photo' | 'video';
  index?: number; // número de foto (1–3) para la etiqueta
  uri?: string; // miniatura (para video, el cuadro de vista previa)
  onPress?: () => void;
  disabled?: boolean;
};

// Cuadrado, radio 12. Vacío: borde punteado e ícono dorado. Cargado: la
// miniatura real con un check success; al tocarlo abre el visor.
export function MediaSlot({ kind, index = 1, uri, onPress, disabled }: Props) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const label = kind === 'photo' ? t('media.photo', { n: index }) : t('media.video');
  const Icon = kind === 'photo' ? Camera : Video;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={uri ? `${label}, ${t('media.loaded')}` : label}
      className={`aspect-square flex-1 overflow-hidden rounded-md ${uri ? 'border border-success' : 'border-[1.5px] border-dashed border-border bg-surface-1'} ${disabled ? 'opacity-40' : ''}`}
    >
      {uri ? (
        <View className="flex-1">
          {kind === 'photo' ? (
            <Image source={{ uri }} style={{ flex: 1 }} contentFit="cover" accessibilityIgnoresInvertColors />
          ) : (
            // Un video no tiene miniatura sin decodificarlo: se marca con play.
            <View className="flex-1 items-center justify-center bg-surface-2">
              <Play size={28} color={palette.text} fill={palette.text} />
            </View>
          )}
          <View className="absolute right-1.5 top-1.5 h-6 w-6 items-center justify-center rounded-pill bg-success">
            <Check size={14} color={palette.ink} strokeWidth={3} />
          </View>
        </View>
      ) : (
        <View className="flex-1 items-center justify-center gap-2">
          <Icon size={24} color={palette.brandSoft} strokeWidth={2} />
          <Text className="text-label text-text-soft">{label}</Text>
        </View>
      )}
    </Pressable>
  );
}
