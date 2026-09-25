import type { LucideIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Button } from './Button';
import { useTheme } from './ThemeProvider';

type Props = {
  icon: LucideIcon;
  title: string;
  text?: string;
  action?: { label: string; onPress: () => void };
};

export function EmptyState({ icon: Icon, title, text, action }: Props) {
  const { palette } = useTheme();
  return (
    <View className="items-center gap-3 rounded-md border border-border bg-surface-1 px-4 py-8">
      <View className="h-14 w-14 items-center justify-center rounded-pill border border-border bg-surface-2">
        <Icon size={26} color={palette.textMute} strokeWidth={2} />
      </View>
      <Text className="text-center text-body-lg font-semibold text-text">{title}</Text>
      {text ? <Text className="text-center text-body text-text-soft">{text}</Text> : null}
      {action ? <Button label={action.label} onPress={action.onPress} size="md" /> : null}
    </View>
  );
}
