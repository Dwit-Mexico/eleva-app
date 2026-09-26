import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { AlertTriangle, Trash2, UserPlus, Users } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { appApi } from '@/api/app';
import { errorText } from '@/api/client';
import { keys, useMembers } from '@/api/queries';
import type { HouseholdMember } from '@/api/schemas';
import { currentLanguage } from '@/store/prefs';
import { BottomSheet, EmptyState, ErrorMessage, Header, Screen, Skeleton, useTheme } from '@/ui';

const fullName = (m: HouseholdMember) => `${m.firstName} ${m.lastName}`.trim();

// Personas con acceso (prototipo: isUsers). Solo el propietario llega aquí.
export default function HouseholdUsers() {
  const { t } = useTranslation();
  const router = useRouter();
  const qc = useQueryClient();
  const { palette } = useTheme();
  const members = useMembers();
  const guests = (members.data ?? []).filter((m) => m.removable);
  const [removing, setRemoving] = useState<HouseholdMember | null>(null);
  const [error, setError] = useState<string>();

  const remove = async () => {
    const m = removing;
    setRemoving(null);
    if (!m) return;
    try {
      await appApi.removeMember(m.personId);
      await qc.invalidateQueries({ queryKey: keys.members });
    } catch (e) {
      setError(errorText(e, currentLanguage()));
    }
  };

  return (
    <Screen
      header={<Header title={t('users.title')} back />}
      onRefresh={() => void members.refetch()}
      refreshing={members.isRefetching}
      bodyClassName="gap-2.5 px-5 pb-7 pt-4"
    >
      <Text className="mb-1 text-caption text-text-soft">{t('users.help')}</Text>
      {members.isLoading ? (
        <Skeleton height={72} />
      ) : members.isError && !members.data ? (
        <EmptyState
          bare
          tone="danger"
          icon={AlertTriangle}
          title={t('users.loadError')}
          action={{ label: t('common.retry'), onPress: () => void members.refetch() }}
        />
      ) : guests.length === 0 ? (
        <EmptyState bare icon={Users} title={t('users.empty')} />
      ) : (
        guests.map((m) => (
          <View
            key={`${m.personId}-${m.unitId}`}
            className="flex-row items-center gap-3.5 rounded-md border border-border bg-surface-1 px-4 py-3.5"
          >
            <View className="h-10 w-10 items-center justify-center rounded-pill bg-surface-2">
              <Text className="text-[14px] font-semibold text-brand-soft">
                {`${m.firstName[0] ?? ''}${m.lastName[0] ?? ''}`.toUpperCase()}
              </Text>
            </View>
            <View className="min-w-0 flex-1">
              <Text className="text-body-lg text-text">{fullName(m)}</Text>
              <Text className="text-caption text-text-soft">{m.email}</Text>
            </View>
            <Pressable
              onPress={() => setRemoving(m)}
              accessibilityRole="button"
              accessibilityLabel={t('users.remove', { name: fullName(m) })}
              className="h-11 w-11 items-center justify-center rounded-sm"
            >
              <Trash2 size={18} color={palette.danger} strokeWidth={2} />
            </Pressable>
          </View>
        ))
      )}
      {error ? <ErrorMessage message={error} /> : null}
      <Pressable
        onPress={() => router.push('/profile/add-user')}
        accessibilityRole="button"
        className="mt-1.5 min-h-13 flex-row items-center justify-center gap-2 rounded-md bg-brand active:opacity-80"
      >
        <UserPlus size={18} color={palette.ink} strokeWidth={2} />
        <Text className="text-[16px] font-semibold text-ink">{t('users.add')}</Text>
      </Pressable>

      <BottomSheet
        visible={removing !== null}
        onClose={() => setRemoving(null)}
        title={t('users.delQ')}
        body={removing ? `${fullName(removing)} · ${t('users.delBody')}` : undefined}
        options={[{ label: t('users.delCta'), tone: 'danger', onPress: remove }]}
      />
    </Screen>
  );
}
