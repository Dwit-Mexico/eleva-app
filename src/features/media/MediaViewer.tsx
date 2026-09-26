import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import type { LucideIcon } from 'lucide-react-native';
import { ChevronLeft, ChevronRight, Pause, Play, X, ZoomIn, ZoomOut } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, Text, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';

import { palettes, withAlpha } from '@/ui/tokens';

export type ViewerItem = { kind: 'photo' | 'video'; uri: string };
export type ViewerAction = {
  label: string;
  icon: LucideIcon;
  danger?: boolean;
  onPress: (index: number) => void;
};

type Props = {
  items: ViewerItem[];
  index: number | null; // null = cerrado
  onIndex: (i: number) => void;
  onClose: () => void;
  caption: string; // "enviada el 24/09/2026" o "sin enviar"
  actions?: ViewerAction[]; // reporte rápido y wizard: reemplazar y quitar
};

// El visor siempre es oscuro, como en el prototipo, sin importar el tema.
const c = palettes.dark;
const MAX = 4;

// Visor de fotos y video (prototipo: viewer). Pellizco o doble toque para
// acercar, arrastrar para mover y deslizar para cambiar cuando no hay zoom.
export function MediaViewer({ items, index, onIndex, onClose, caption, actions }: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [zoom, setZoom] = useState(1);
  const scale = useSharedValue(1);
  const saved = useSharedValue(1);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const ox = useSharedValue(0);
  const oy = useSharedValue(0);

  const open = index !== null && items.length > 0;
  const i = Math.min(index ?? 0, Math.max(items.length - 1, 0));
  const item = items[i];
  const isVideo = item?.kind === 'video';
  const photoN = items.slice(0, i + 1).filter((m) => m.kind === 'photo').length;

  const apply = (z: number) => {
    const n = Math.min(MAX, Math.max(1, Math.round(z * 10) / 10));
    scale.value = withTiming(n, { duration: 120 });
    saved.value = n;
    if (n === 1) {
      x.value = withTiming(0, { duration: 120 });
      y.value = withTiming(0, { duration: 120 });
    }
    setZoom(n);
  };
  const go = (n: number) => {
    if (n < 0 || n >= items.length) return;
    scale.value = 1;
    saved.value = 1;
    x.value = 0;
    y.value = 0;
    setZoom(1);
    onIndex(n);
  };

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.min(MAX, Math.max(1, saved.value * e.scale));
    })
    .onEnd(() => {
      scheduleOnRN(apply, scale.value);
    });
  const pan = Gesture.Pan()
    .onStart(() => {
      ox.value = x.value;
      oy.value = y.value;
    })
    .onUpdate((e) => {
      if (scale.value <= 1) return;
      const lim = ((scale.value - 1) * width) / 2;
      x.value = Math.min(lim, Math.max(-lim, ox.value + e.translationX));
      y.value = Math.min(lim, Math.max(-lim, oy.value + e.translationY));
    })
    .onEnd((e) => {
      if (scale.value > 1 || Math.abs(e.translationX) < 60) return;
      scheduleOnRN(go, e.translationX < 0 ? i + 1 : i - 1);
    });
  const double = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scheduleOnRN(apply, saved.value > 1 ? 1 : 2.5);
    });
  const gesture = Gesture.Simultaneous(pinch, pan, double);

  const mediaStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }, { scale: scale.value }],
  }));

  return (
    <Modal visible={open} animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000' }}>
        {item ? (
          <View
            style={{ flex: 1, paddingTop: insets.top + 8, paddingBottom: Math.max(insets.bottom, 16) + 20 }}
          >
            <View className="flex-row items-center gap-2 px-3 pb-2">
              <View className="min-w-0 flex-1 pl-2">
                <Text style={{ color: c.text }} className="text-body font-semibold leading-[1.375rem]">
                  {isVideo ? t('media.video') : t('media.photo', { n: photoN })}
                </Text>
                <Text style={{ color: c.textMute }} className="text-label">
                  {t('media.of', { n: i + 1, total: items.length })} · {caption}
                </Text>
              </View>
              <Round icon={X} size={22} label={t('media.close')} onPress={onClose} big />
            </View>

            <GestureDetector gesture={gesture}>
              <View className="flex-1 items-center justify-center overflow-hidden">
                <Animated.View style={[{ width: '100%', height: '100%' }, mediaStyle]}>
                  {isVideo ? (
                    <Video uri={item.uri} />
                  ) : (
                    <Image
                      source={{ uri: item.uri }}
                      style={{ flex: 1 }}
                      contentFit="contain"
                      transition={150}
                    />
                  )}
                </Animated.View>
                {zoom === 1 && !isVideo ? (
                  <Text style={{ color: c.textMute }} className="absolute bottom-3 text-center text-label">
                    {t('media.hint')}
                  </Text>
                ) : null}
              </View>
            </GestureDetector>

            <View className="flex-row items-center gap-2 px-4 py-2">
              <Round
                icon={ChevronLeft}
                label={t('media.prev')}
                onPress={() => go(i - 1)}
                disabled={i === 0}
              />
              <View className="flex-1 flex-row items-center justify-center gap-1.5">
                <Round
                  icon={ZoomOut}
                  size={18}
                  label={t('media.zoomOut')}
                  onPress={() => apply(zoom - 0.5)}
                  disabled={zoom <= 1 || isVideo}
                />
                <Text style={{ color: c.textSoft }} className="min-w-11 text-center font-mono text-[0.8125rem]">
                  {zoom}×
                </Text>
                <Round
                  icon={ZoomIn}
                  size={18}
                  label={t('media.zoomIn')}
                  onPress={() => apply(zoom + 0.5)}
                  disabled={zoom >= MAX || isVideo}
                />
              </View>
              <Round
                icon={ChevronRight}
                label={t('media.next')}
                onPress={() => go(i + 1)}
                disabled={i === items.length - 1}
              />
            </View>

            <View className="flex-row justify-center gap-2 px-4 pt-1">
              {items.map((m, n) => (
                <Pressable
                  key={m.uri}
                  onPress={() => go(n)}
                  accessibilityRole="imagebutton"
                  accessibilityLabel={m.kind === 'video' ? t('media.video') : t('media.photo', { n: n + 1 })}
                  accessibilityState={{ selected: n === i }}
                  style={{ borderColor: n === i ? c.brand : c.surface2, backgroundColor: '#131415' }}
                  className="h-11 w-11 items-center justify-center overflow-hidden rounded-sm border"
                >
                  {m.kind === 'photo' ? (
                    <Image
                      source={{ uri: m.uri }}
                      style={{ width: '100%', height: '100%' }}
                      contentFit="cover"
                    />
                  ) : (
                    <Play size={14} color={c.brandSoft} fill={c.brandSoft} />
                  )}
                </Pressable>
              ))}
            </View>

            {actions?.length ? (
              <View className="flex-row gap-2.5 px-4 pt-4">
                {actions.map((a) => (
                  <Pressable
                    key={a.label}
                    onPress={() => a.onPress(i)}
                    accessibilityRole="button"
                    style={
                      a.danger ? { borderWidth: 1, borderColor: c.danger } : { backgroundColor: c.brand }
                    }
                    className="min-h-13 flex-1 flex-row items-center justify-center gap-2 rounded-md active:opacity-80"
                  >
                    <a.icon size={18} color={a.danger ? c.danger : c.ink} strokeWidth={2} />
                    <Text
                      style={{ color: a.danger ? c.danger : c.ink }}
                      className="text-[1rem] font-semibold"
                    >
                      {a.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>
        ) : null}
      </GestureHandlerRootView>
    </Modal>
  );
}

function Round({
  icon: Icon,
  label,
  onPress,
  disabled,
  size = 20,
  big,
}: {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  size?: number;
  big?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      style={{ backgroundColor: withAlpha('#FFFFFF', disabled ? 0.04 : 0.08) }}
      className={`${big ? 'h-11 w-11' : 'h-10 w-10'} items-center justify-center rounded-pill`}
    >
      <Icon size={size} color={disabled ? c.textDisabled : c.text} strokeWidth={2} />
    </Pressable>
  );
}

// Video con el botón de reproducir al centro (64, fondo oscuro al 72 %).
function Video({ uri }: { uri: string }) {
  const { t } = useTranslation();
  const player = useVideoPlayer(uri, (p) => {
    p.loop = false;
  });
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const sub = player.addListener('playingChange', (e) => setPlaying(e.isPlaying));
    return () => sub.remove();
  }, [player]);
  return (
    <View className="flex-1 items-center justify-center">
      <VideoView
        player={player}
        style={{ width: '100%', aspectRatio: 16 / 9 }}
        contentFit="contain"
        nativeControls={false}
      />
      <Pressable
        onPress={() => (playing ? player.pause() : player.play())}
        accessibilityRole="button"
        accessibilityLabel={playing ? t('media.pause') : t('media.play')}
        style={{ backgroundColor: withAlpha(c.bg, 0.72), borderColor: c.border }}
        className="absolute h-16 w-16 items-center justify-center rounded-pill border"
      >
        {playing ? <Pause size={26} color={c.text} /> : <Play size={26} color={c.text} />}
      </Pressable>
    </View>
  );
}
