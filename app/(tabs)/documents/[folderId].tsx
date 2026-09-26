import { useLocalSearchParams } from 'expo-router';
import { AlertTriangle, Download, FileText, FolderOpen } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Linking, Pressable, Text, View } from 'react-native';

import { useDocuments } from '@/api/queries';
import { fileSize } from '@/lib/fileSize';
import { formatDate } from '@/lib/relativeTime';
import { EmptyState, Header, Screen, Skeleton, useTheme } from '@/ui';

// Archivos de una carpeta (prototipo: isDocFiles). Tocar abre el PDF con el
// visor del sistema.
export default function FolderFiles() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { folderId, name } = useLocalSearchParams<{ folderId: string; name?: string }>();
  const docs = useDocuments(Number(folderId));
  return (
    <Screen
      header={<Header title={name ?? t('docs.title')} back />}
      onRefresh={() => void docs.refetch()}
      refreshing={docs.isRefetching}
      bodyClassName="gap-2.5 px-5 pb-7 pt-4"
    >
      {docs.isLoading ? (
        <>
          <Skeleton height={64} />
          <Skeleton height={64} />
        </>
      ) : docs.isError && !docs.data ? (
        <EmptyState
          bare
          tone="danger"
          icon={AlertTriangle}
          title={t('docs.loadError')}
          action={{ label: t('common.retry'), onPress: () => void docs.refetch() }}
        />
      ) : !docs.data?.length ? (
        <EmptyState bare icon={FolderOpen} title={t('docs.emptyFiles')} />
      ) : (
        docs.data.map((d) => {
          const ext = d.name.split('.').pop()?.toUpperCase() ?? 'PDF';
          const meta = [
            ext,
            d.size ? fileSize(d.size) : null,
            d.uploadedAt ? formatDate(new Date(d.uploadedAt)) : null,
          ]
            .filter(Boolean)
            .join(' · ');
          return (
            <Pressable
              key={d.id}
              onPress={() => void Linking.openURL(d.url)}
              accessibilityRole="button"
              accessibilityLabel={t('docs.open', { name: d.name })}
              className="min-h-16 flex-row items-center gap-3.5 rounded-md border border-border bg-surface-1 px-4 py-3.5 active:opacity-80"
            >
              <View className="h-10 w-10 items-center justify-center rounded-sm bg-surface-2">
                <FileText size={20} color={palette.danger} strokeWidth={2} />
              </View>
              <View className="min-w-0 flex-1">
                <Text className="text-body-lg text-text" numberOfLines={2}>
                  {d.name}
                </Text>
                <Text className="text-caption text-text-soft">{meta}</Text>
              </View>
              <Download size={18} color={palette.brandSoft} strokeWidth={2} />
            </Pressable>
          );
        })
      )}
    </Screen>
  );
}
