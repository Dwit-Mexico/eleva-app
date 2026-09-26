import { useQueryClient } from '@tanstack/react-query';
import { CloudOff, Wifi } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { useOnline } from '@/lib/online';
import { formatTime } from '@/lib/relativeTime';
import { currentLanguage } from '@/store/prefs';

import { useTheme } from './ThemeProvider';

// Franja bajo el header (prototipo: offlineBanner / onlineFlash). Sin
// conexión: surface-2 con la hora de los últimos datos. Al volver la red,
// "Conexión recuperada" en success-tint durante 3 s.
export function ConnectionBanner() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const qc = useQueryClient();
  const online = useOnline();
  const was = useRef(online);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (online && !was.current) {
      setFlash(true);
      const id = setTimeout(() => setFlash(false), 3000);
      was.current = online;
      return () => clearTimeout(id);
    }
    was.current = online;
    return undefined;
  }, [online]);

  if (!online) {
    const last = Math.max(
      0,
      ...qc
        .getQueryCache()
        .getAll()
        .map((q) => q.state.dataUpdatedAt),
    );
    const d = last ? new Date(last) : null;
    const today = d ? d.toDateString() === new Date().toDateString() : false;
    return (
      <View
        accessibilityRole="alert"
        className="flex-row items-center gap-2.5 border-b border-border bg-surface-2 px-5 py-2.5"
      >
        <CloudOff size={18} color={palette.textSoft} strokeWidth={2} />
        <View className="min-w-0 flex-1">
          <Text className="text-[0.875rem] font-semibold leading-5 text-text">{t('offline.banner')}</Text>
          <Text className="text-label text-text-soft">
            {d
              ? t('offline.lastData', {
                  when: today ? t('time.today') : d.toLocaleDateString(),
                  time: formatTime(d, currentLanguage()),
                })
              : t('offline.noData')}
          </Text>
        </View>
      </View>
    );
  }
  if (!flash) return null;
  return (
    <View
      accessibilityRole="alert"
      className="flex-row items-center gap-2.5 border-b border-border bg-success-tint px-5 py-2.5"
    >
      <Wifi size={18} color={palette.success} strokeWidth={2} />
      <Text className="text-[0.875rem] font-semibold leading-5 text-text">{t('offline.back')}</Text>
    </View>
  );
}
