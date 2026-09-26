import { useRouter } from 'expo-router';
import { AlertTriangle, ChevronRight, Folder, FolderOpen } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { useFolders } from '@/api/queries';
import { EmptyState, Header, Screen, Skeleton, useTheme } from '@/ui';

// Carpetas de documentos (prototipo: isDocs).
export default function Documents() {
  const { t } = useTranslation();
  const router = useRouter();
  const { palette } = useTheme();
  const folders = useFolders();
  return (
    <Screen
      header={<Header title={t('docs.title')} />}
      onRefresh={() => void folders.refetch()}
      refreshing={folders.isRefetching}
      bodyClassName="gap-2.5 px-5 pb-7 pt-4"
    >
      {folders.isLoading ? (
        <>
          <Skeleton height={64} />
          <Skeleton height={64} />
          <Skeleton height={64} />
        </>
      ) : folders.isError && !folders.data ? (
        <EmptyState
          bare
          tone="danger"
          icon={AlertTriangle}
          title={t('docs.loadError')}
          action={{ label: t('common.retry'), onPress: () => void folders.refetch() }}
        />
      ) : !folders.data?.length ? (
        <EmptyState bare icon={FolderOpen} title={t('docs.emptyFolders')} text={t('docs.emptyFoldersBody')} />
      ) : (
        folders.data.map((f) => (
          <Pressable
            key={f.id}
            onPress={() => router.push({ pathname: '/documents/[folderId]', params: { folderId: String(f.id), name: f.name } })}
            accessibilityRole="button"
            accessibilityLabel={`${f.name}, ${t('docs.files', { count: f.documentCount })}`}
            className="min-h-16 flex-row items-center gap-3.5 rounded-md border border-border bg-surface-1 px-4 py-3.5 active:opacity-80"
          >
            <View className="h-10 w-10 items-center justify-center rounded-sm bg-surface-2">
              <Folder size={20} color={palette.brandSoft} strokeWidth={2} />
            </View>
            <View className="min-w-0 flex-1">
              <Text className="text-body-lg text-text">{f.name}</Text>
              <Text className="text-caption text-text-soft">{t('docs.files', { count: f.documentCount })}</Text>
            </View>
            <ChevronRight size={18} color={palette.textMute} strokeWidth={2} />
          </Pressable>
        ))
      )}
    </Screen>
  );
}
