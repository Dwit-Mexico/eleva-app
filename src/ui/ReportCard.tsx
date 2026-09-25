import { ChevronRight } from 'lucide-react-native';
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
  cta?: string; // p. ej. "Valorar el servicio" (warning)
  onPress?: () => void;
};

export function ReportCard({ folio, statusId, createdAt, title, location, cta, onPress }: Props) {
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
        <Text className="text-caption text-text-soft">{location}</Text>
        {cta ? (
          <View className="mt-1 flex-row items-center justify-between rounded-sm bg-warning-tint px-3 py-2.5">
            <Text className="text-body font-semibold text-warning">{cta}</Text>
            <ChevronRight size={18} color={palette.warning} strokeWidth={2} />
          </View>
        ) : null}
      </View>
    </Card>
  );
}
