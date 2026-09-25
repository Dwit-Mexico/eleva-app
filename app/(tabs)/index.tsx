import { useRouter } from 'expo-router';
import { AlertTriangle, Calendar, CalendarClock, Camera, ChevronRight, ListChecks, Star, Archive } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { useNotifications, useRequests } from '@/api/queries';
import { byNewest, requestLocation, requestTitle } from '@/features/requests/labels';
import { UnitCard } from '@/features/units/UnitCard';
import { useDraft } from '@/features/wizard/draft';
import { formatVisit } from '@/lib/relativeTime';
import { useActiveUnit } from '@/store/activeUnit';
import { currentLanguage } from '@/store/prefs';
import { BellButton, Button, Card, EmptyState, Header, ReportCard, Screen, Skeleton, useTheme } from '@/ui';

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const { palette } = useTheme();
  const lang = currentLanguage();
  const { unit, units, loading: loadingUnits } = useActiveUnit();
  const requests = useRequests();
  const notifications = useNotifications();
  const draft = useDraft((s) => s.draft);

  const mine = useMemo(
    () => (requests.data ?? []).filter((r) => !unit || r.unit.id === unit.unitId).sort(byNewest),
    [requests.data, unit],
  );
  const counts = {
    status: mine.filter((r) => r.stage === 'status').length,
    rating: mine.filter((r) => r.stage === 'rating').length,
    history: mine.filter((r) => r.stage === 'history').length,
  };
  const [now] = useState(() => Date.now()); // se recalcula al volver a montar
  const nextVisit = mine
    .filter((r) => r.status.id === 5 && r.visit?.scheduledAt && Date.parse(r.visit.scheduledAt) > now)
    .sort((a, b) => a.visit!.scheduledAt!.localeCompare(b.visit!.scheduledAt!))[0];
  const toSchedule = mine.find((r) => r.status.id === 4 && (r.proposedDates?.length ?? 0) > 0);
  const toRate = mine.filter((r) => r.canRate);
  const unread = (notifications.data ?? []).some((n) => !n.read);

  const refresh = () => {
    void requests.refetch();
    void notifications.refetch();
  };

  const tiles = [
    { key: 'status', label: t('home.inProgress'), count: counts.status, icon: ListChecks },
    { key: 'rating', label: t('home.toRate'), count: counts.rating, icon: Star },
    { key: 'history', label: t('home.closed'), count: counts.history, icon: Archive },
  ] as const;

  return (
    <Screen
      header={
        <Header title={t('home.title')} right={<BellButton unread={unread} onPress={() => router.push('/notifications')} />} />
      }
      onRefresh={refresh}
      refreshing={requests.isRefetching}
    >
      {loadingUnits ? (
        <Skeleton height={76} />
      ) : unit ? (
        <UnitCard unit={unit} units={units} />
      ) : (
        <EmptyState icon={AlertTriangle} title={t('home.noUnits')} text={t('home.noUnitsBody')} />
      )}

      {unit ? (
        <>
          <Pressable
            onPress={() => router.push('/report/quick')}
            accessibilityRole="button"
            accessibilityLabel={`${t('home.quickTitle')}. ${t('home.quickSub')}`}
            className="flex-row items-center gap-4 rounded-md bg-brand px-5 py-5 active:opacity-80"
          >
            <View className="h-12 w-12 items-center justify-center rounded-pill bg-ink/10">
              <Camera size={26} color={palette.ink} strokeWidth={2} />
            </View>
            <View className="flex-1">
              <Text className="text-body-lg font-semibold text-ink">{t('home.quickTitle')}</Text>
              <Text className="text-caption text-ink/80">{t('home.quickSub')}</Text>
            </View>
          </Pressable>
          <Button label={t('home.guidedLink')} variant="ghost" size="md" onPress={() => router.push('/report/wizard')} />

          {draft ? (
            <Card onPress={() => router.push('/report/wizard')} accessibilityLabel={t('home.draftTitle')}>
              <View className="flex-row items-center gap-3">
                <View className="flex-1">
                  <Text className="text-body font-semibold text-text">{t('home.draftTitle')}</Text>
                  <Text className="text-caption text-text-soft">{t('home.draftSub')}</Text>
                </View>
                <ChevronRight size={18} color={palette.textMute} strokeWidth={2} />
              </View>
            </Card>
          ) : null}

          {nextVisit ? (
            <Card onPress={() => router.push(`/report/${nextVisit.id}`)} accessibilityLabel={t('home.nextVisit')}>
              <View className="flex-row items-center gap-3">
                <View className="h-11 w-11 items-center justify-center rounded-pill bg-success-tint">
                  <Calendar size={20} color={palette.success} strokeWidth={2} />
                </View>
                <View className="flex-1">
                  <Text className="text-label font-medium text-text-mute">{t('home.nextVisit')}</Text>
                  <Text className="text-body-lg text-text">{formatVisit(new Date(nextVisit.visit!.scheduledAt!), lang)}</Text>
                  <Text className="text-caption text-text-soft">
                    {nextVisit.folio} · {requestTitle(nextVisit, lang, t('report.quickTitle'))}
                  </Text>
                </View>
              </View>
            </Card>
          ) : null}

          {toSchedule ? (
            <Card onPress={() => router.push(`/report/${toSchedule.id}`)} accessibilityLabel={t('home.chooseVisit')}>
              <View className="flex-row items-center gap-3">
                <View className="h-11 w-11 items-center justify-center rounded-pill bg-info-tint">
                  <CalendarClock size={20} color={palette.info} strokeWidth={2} />
                </View>
                <View className="flex-1">
                  <Text className="text-body font-semibold text-text">{t('home.chooseVisit')}</Text>
                  <Text className="text-caption text-text-soft">
                    {toSchedule.folio} · {requestTitle(toSchedule, lang, t('report.quickTitle'))}
                  </Text>
                </View>
                <ChevronRight size={18} color={palette.textMute} strokeWidth={2} />
              </View>
            </Card>
          ) : null}

          {toRate.length > 0 ? (
            <Pressable
              onPress={() => router.push({ pathname: '/reports', params: { tab: 'rating' } })}
              accessibilityRole="button"
              className="flex-row items-center gap-3 rounded-md bg-warning-tint px-4 py-3.5 active:opacity-80"
            >
              <Star size={20} color={palette.warning} strokeWidth={2} />
              <Text className="flex-1 text-body font-semibold text-warning">{t('home.pendingRating')}</Text>
              <ChevronRight size={18} color={palette.warning} strokeWidth={2} />
            </Pressable>
          ) : null}

          <View className="flex-row gap-3">
            {tiles.map(({ key, label, count, icon: Icon }) => (
              <Pressable
                key={key}
                onPress={() => router.push({ pathname: '/reports', params: { tab: key } })}
                accessibilityRole="button"
                accessibilityLabel={`${label}: ${count}`}
                className="flex-1 items-start gap-2 rounded-md border border-border bg-surface-1 p-3.5 active:opacity-80"
              >
                <Icon size={20} color={palette.brandSoft} strokeWidth={2} />
                <Text className="text-title font-semibold text-text">{requests.isLoading ? '–' : count}</Text>
                <Text className="text-caption text-text-soft">{label}</Text>
              </Pressable>
            ))}
          </View>

          <View className="flex-row items-center justify-between pt-2">
            <Text className="text-body-lg font-semibold text-text" accessibilityRole="header">
              {t('home.recent')}
            </Text>
            {mine.length > 2 ? (
              <Pressable onPress={() => router.push('/reports')} accessibilityRole="button" className="min-h-11 justify-center">
                <Text className="text-body font-semibold text-brand-soft">{t('home.seeAll')}</Text>
              </Pressable>
            ) : null}
          </View>
          {requests.isLoading ? (
            <>
              <Skeleton />
              <Skeleton />
            </>
          ) : requests.isError ? (
            <EmptyState
              icon={AlertTriangle}
              title={t('home.loadError')}
              action={{ label: t('common.retry'), onPress: refresh }}
            />
          ) : mine.length === 0 ? (
            <EmptyState icon={ListChecks} title={t('home.noReports')} text={t('home.noReportsBody')} />
          ) : (
            mine.slice(0, 2).map((r) => (
              <ReportCard
                key={r.id}
                folio={r.folio}
                statusId={r.status.id}
                createdAt={new Date(r.createdAt)}
                title={requestTitle(r, lang, t('report.quickTitle'))}
                location={requestLocation(r, lang)}
                cta={r.canRate ? t('home.pendingRating') : undefined}
                onPress={() => router.push(`/report/${r.id}`)}
              />
            ))
          )}
        </>
      ) : null}
    </Screen>
  );
}
