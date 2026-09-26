import { MapPin, Star } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { relativeTime } from '@/lib/relativeTime';

import { Card } from './Card';
import { StatusBadge } from './StatusBadge';
import { useTheme } from './ThemeProvider';

type Props = {
  folio: string;
  statusId: number;
  createdAt: Date;
  title: string;
  location: string;
  cta?: string; // "Califica la reparación": botón con borde warning
  pin?: boolean; // ícono de ubicación (lista; el Inicio no lo lleva)
  onPress?: () => void;
};

export function ReportCard({ folio, statusId, createdAt, title, location, cta, pin, onPress }: Props) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  return (
    <Card onPress={onPress} accessibilityLabel={`${folio}, ${title}`}>
      <View className="gap-2">
        <View className="flex-row flex-wrap items-center gap-2">
          <Text className="font-mono text-folio tracking-[0.24px] text-text-mute">{folio}</Text>
          <StatusBadge statusId={statusId} />
          <Text className="ml-auto text-caption text-text-soft">{relativeTime(createdAt, t)}</Text>
        </View>
        <Text className="text-body-lg text-text" numberOfLines={2}>
          {title}
        </Text>
        <View className="flex-row items-center gap-1.5">
          {pin ? <MapPin size={14} color={palette.textSoft} strokeWidth={2} /> : null}
          <Text className="flex-1 text-caption text-text-soft">{location}</Text>
        </View>
        {cta ? (
          <View className="mt-0.5 min-h-11 flex-row items-center justify-center gap-2 rounded-sm border border-warning px-3">
            <Star size={16} color={palette.warning} strokeWidth={2} />
            <Text className="text-[0.875rem] font-semibold text-warning">{cta}</Text>
          </View>
        ) : null}
      </View>
    </Card>
  );
}
