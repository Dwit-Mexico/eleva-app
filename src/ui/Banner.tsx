import { CloudOff, Wifi, type LucideIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { useTheme } from './ThemeProvider';

type Tone = 'offline' | 'success';

// Franja bajo el header para avisos de estado (sin conexión, conexión recuperada).
export function Banner({ tone, text, detail }: { tone: Tone; text: string; detail?: string }) {
  const { palette } = useTheme();
  const cfg: Record<Tone, { icon: LucideIcon; box: string; color: string; text: string }> = {
    offline: { icon: CloudOff, box: 'bg-warning-tint', color: palette.warning, text: 'text-warning' },
    success: { icon: Wifi, box: 'bg-success-tint', color: palette.success, text: 'text-success' },
  };
  const { icon: Icon, box, color, text: txt } = cfg[tone];
  return (
    <View className={`flex-row items-center gap-2 px-5 py-2.5 ${box}`} accessibilityRole="alert">
      <Icon size={18} color={color} strokeWidth={2} />
      <Text className={`flex-1 text-caption font-medium ${txt}`}>{text}</Text>
      {detail ? <Text className="text-caption text-text-soft">{detail}</Text> : null}
    </View>
  );
}
