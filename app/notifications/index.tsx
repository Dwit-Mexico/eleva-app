import { useRouter } from 'expo-router';
import { AlertTriangle, Bell, MessageSquare } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { useNotifications } from '@/api/queries';
import { localizedNotice } from '@/features/notifications/text';
import { formatDateTime } from '@/lib/relativeTime';
import { currentLanguage } from '@/store/prefs';
import { EmptyState, Header, Screen, Skeleton, useTheme } from '@/ui';

// Bandeja de avisos (prototipo: isNotifs). Los sin leer llevan punto brand.
export default function Notifications() {
  const { t } = useTranslation();
  const router = useRouter();
  const { palette } = useTheme();
  const lang = currentLanguage();
  const q = useNotifications();
  const list = [...(q.data ?? [])].sort((a, b) => b.sentAt.localeCompare(a.sentAt));
  return (
    <Screen
      header={<Header title={t('notifs.title')} back />}
      onRefresh={() => void q.refetch()}
      refreshing={q.isRefetching}
      bodyClassName="gap-2.5 px-5 pb-7 pt-4"
    >
      {q.isLoading ? (
        <>
          <Skeleton height={64} />
          <Skeleton height={64} />
        </>
      ) : q.isError && !q.data ? (
        <EmptyState
          bare
          tone="danger"
          icon={AlertTriangle}
          title={t('notifs.loadError')}
          action={{ label: t('common.retry'), onPress: () => void q.refetch() }}
        />
      ) : list.length === 0 ? (
        <EmptyState bare icon={Bell} title={t('notifs.empty')} text={t('notifs.emptyBody')} />
      ) : (
        list.map((n) => (
          <Pressable
            key={n.id}
            onPress={() => router.push({ pathname: '/notifications/[id]', params: { id: String(n.id) } })}
            accessibilityRole="button"
            accessibilityLabel={`${n.read ? '' : `${t('notifs.unread')}. `}${localizedNotice(n.message, lang)}`}
            className={`min-h-16 flex-row items-center gap-3 rounded-md border bg-surface-1 px-4 py-3.5 active:opacity-80 ${n.read ? 'border-surface-2' : 'border-border'}`}
          >
            <View className="h-10 w-10 items-center justify-center rounded-pill bg-surface-2">
              <MessageSquare size={18} color={palette.brandSoft} strokeWidth={2} />
            </View>
            <View className="min-w-0 flex-1">
              <Text className="text-body leading-[1.375rem] text-text">{localizedNotice(n.message, lang)}</Text>
              <Text className="mt-0.5 text-caption text-text-mute">{formatDateTime(new Date(n.sentAt))}</Text>
            </View>
            {!n.read ? <View className="h-2 w-2 rounded-pill bg-brand" /> : null}
          </Pressable>
        ))
      )}
    </Screen>
  );
}
