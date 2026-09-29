import type { LucideIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Button } from './Button';
import { useTheme } from './ThemeProvider';
import { cn } from '../lib/cn';

type Props = {
  icon: LucideIcon;
  title: string;
  text?: string;
  action?: { label: string; onPress: () => void; primary?: boolean };
  bare?: boolean; // sin tarjeta (lista de reportes)
  tone?: 'neutral' | 'danger'; // danger: círculo danger-tint (error de carga)
};

export function EmptyState({ icon: Icon, title, text, action, bare, tone = 'neutral' }: Props) {
  const { palette } = useTheme();
  const danger = tone === 'danger';
  return (
    <View
      className={cn('items-center gap-3', {
        'p-6': bare && danger,
        'px-4 py-8': !bare || !danger,
        'rounded-md border border-border bg-surface-1': !bare,
      })}
    >
      <View
        className={cn('h-14 w-14 items-center justify-center rounded-pill', {
          'bg-danger-tint': danger,
          'border border-border': !danger,
          'bg-surface-1': !danger && bare,
          'bg-surface-2': !danger && !bare,
        })}
      >
        <Icon size={26} color={danger ? palette.danger : palette.textMute} strokeWidth={2} />
      </View>
      <Text className="text-center text-body-lg font-semibold text-text">{title}</Text>
      {text ? <Text className="text-center text-body leading-[1.375rem] text-text-soft">{text}</Text> : null}
      {action ? (
        <Button
          label={action.label}
          onPress={action.onPress}
          size="md"
          variant={action.primary ? 'primary' : 'secondary'}
        />
      ) : null}
    </View>
  );
}
