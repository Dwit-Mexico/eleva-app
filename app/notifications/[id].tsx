import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text } from 'react-native';

import { useNotifications, useRequests } from '@/api/queries';
import { markNoticeRead } from '@/features/notifications/read';
import { isMessageNotice, localizedNotice } from '@/features/notifications/text';
import { formatDateTime } from '@/lib/relativeTime';
import { currentLanguage } from '@/store/prefs';
import { Header, Screen, useTheme } from '@/ui';

// Aviso (prototipo: isNotifDetail): fecha y texto. Desde la bandeja solo se
// llega aquí con los avisos generales; los de reporte van directo a su
// destino. Abrirlo lo marca como leído.
export default function NotificationDetail() {
  const { t } = useTranslation();
  const router = useRouter();
  const qc = useQueryClient();
  const { palette } = useTheme();
  const lang = currentLanguage();
  const { id } = useLocalSearchParams<{ id: string }>();
  const nid = Number(id);
  const n = useNotifications().data?.find((x) => x.id === nid);
  const folio = useRequests().data?.find((r) => r.id === n?.requestId)?.folio;

  const chat = n ? isMessageNotice(n.message) : false;
  const unread = n ? !n.read : false;
  useEffect(() => {
    if (unread && n) markNoticeRead(qc, n);
  }, [unread, n, qc]);

  return (
    <Screen header={<Header title={t('notifs.title')} back />} bodyClassName="gap-3 px-5 pb-7 pt-4">
      {n ? (
        <>
          <Text className="text-caption text-text-mute">{formatDateTime(new Date(n.sentAt))}</Text>
          <Text className="text-title font-semibold tracking-[-0.22px] text-text">
            {localizedNotice(n.message, lang)}
          </Text>
          {n.requestId ? (
            <Pressable
              onPress={() =>
                router.push(chat ? `/reports/${n.requestId}/messages` : `/reports/${n.requestId}`)
              }
              accessibilityRole="button"
              accessibilityLabel={`${chat ? t('notifs.openMessages') : t('notifs.openReport')} ${folio ?? ''}`}
              className="mt-1 min-h-14 flex-row items-center gap-2.5 rounded-md border border-border bg-surface-1 px-4 py-3.5 active:opacity-80"
            >
              <Text className="font-mono text-folio text-text-mute">{folio ?? `#${n.requestId}`}</Text>
              <Text className="ml-auto text-[0.875rem] font-semibold text-brand-soft">
                {t('notifs.openReport')}
              </Text>
              <ChevronRight size={18} color={palette.textMute} strokeWidth={2} />
            </Pressable>
          ) : null}
        </>
      ) : null}
    </Screen>
  );
}
