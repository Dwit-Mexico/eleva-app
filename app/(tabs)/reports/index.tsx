import { useLocalSearchParams, useRouter } from 'expo-router';
import { Building2, Inbox, WifiOff } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useRequests } from '@/api/queries';
import { byNewest, requestLocation, requestTitle } from '@/features/requests/labels';
import { useActiveUnit, useActiveUnitStore } from '@/store/activeUnit';
import { currentLanguage } from '@/store/prefs';
import { BottomSheet, EmptyState, Header, ReportCard, Screen, Skeleton, useTheme } from '@/ui';

type Stage = 'status' | 'rating' | 'history';
const STAGES: Stage[] = ['status', 'rating', 'history'];
const EMPTY = {
  status: ['list.emptyStatus', 'list.emptyStatusBody'],
  rating: ['list.emptyRating', 'list.emptyRatingBody'],
  history: ['list.emptyHistory', 'list.emptyHistoryBody'],
} as const;

// Lista de reportes (prototipo: isList). El título sigue al segmento y solo se
// ven los reportes de la vivienda activa del Inicio.
export default function Reports() {
  const { t } = useTranslation();
  const router = useRouter();
  const { palette } = useTheme();
  const lang = currentLanguage();
  const params = useLocalSearchParams<{ tab?: Stage }>();
  const [stage, setStage] = useState<Stage>(() => (STAGES.includes(params.tab as Stage) ? params.tab! : 'status'));
  // El Inicio vuelve a mandar ?tab= al tocar un contador con la lista ya montada.
  const [lastTab, setLastTab] = useState(params.tab);
  if (params.tab !== lastTab) {
    setLastTab(params.tab);
    if (STAGES.includes(params.tab as Stage)) setStage(params.tab!);
  }

  const { unit, units } = useActiveUnit();
  const setUnit = useActiveUnitStore((s) => s.setUnit);
  const [unitSheet, setUnitSheet] = useState(false);
  const requests = useRequests();
  const items = useMemo(
    () =>
      (requests.data ?? [])
        .filter((r) => (!unit || r.unit.id === unit.unitId) && r.stage === stage)
        .sort(byNewest),
    [requests.data, unit, stage],
  );
  const [emptyTitle, emptyBody] = EMPTY[stage];

  return (
    <Screen
      header={<Header title={t(`list.${stage}`)} />}
      onRefresh={() => void requests.refetch()}
      refreshing={requests.isRefetching}
      bodyClassName="gap-4 pb-7 pt-4"
    >
      {units.length > 1 && unit ? (
        <Pressable
          onPress={() => setUnitSheet(true)}
          accessibilityRole="button"
          accessibilityLabel={`${unit.label}. ${t('home.change')}`}
          className="mx-5 min-h-11 flex-row items-center gap-2.5 rounded-md border border-border bg-surface-1 px-3.5 py-2 active:opacity-80"
        >
          <Building2 size={16} color={palette.brandSoft} strokeWidth={2} />
          <Text className="flex-1 text-[14px] leading-5 text-text-soft">{unit.label}</Text>
          <Text className="text-[13px] font-semibold text-brand-soft">{t('home.change')}</Text>
        </Pressable>
      ) : null}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 px-5">
        {STAGES.map((s) => {
          const on = s === stage;
          return (
            <Pressable
              key={s}
              onPress={() => setStage(s)}
              accessibilityRole="tab"
              accessibilityState={{ selected: on }}
              className={`min-h-10 items-center justify-center rounded-pill px-4 ${on ? 'bg-brand' : 'border border-border bg-surface-1'}`}
            >
              <Text className={`text-[14px] font-semibold ${on ? 'text-ink' : 'text-text-soft'}`}>{t(`list.${s}`)}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View className="px-5">
        {requests.isLoading ? (
          <View className="gap-2.5">
            <Skeleton height={104} />
            <Skeleton height={104} />
            <Skeleton height={104} />
          </View>
        ) : requests.isError && !requests.data ? (
          <EmptyState
            bare
            tone="danger"
            icon={WifiOff}
            title={t('list.errTitle')}
            text={t('list.errBody')}
            action={{ label: t('common.retry'), onPress: () => void requests.refetch() }}
          />
        ) : items.length === 0 ? (
          <EmptyState
            bare
            icon={Inbox}
            title={t(emptyTitle)}
            text={t(emptyBody)}
            action={{ label: t('report.newReport'), onPress: () => router.push('/reports/wizard'), primary: true }}
          />
        ) : (
          <View className="gap-2.5">
            {items.map((r) => (
              <ReportCard
                key={r.id}
                folio={r.folio}
                statusId={r.status.id}
                createdAt={new Date(r.createdAt)}
                title={requestTitle(r, lang, t('report.quickTitle'))}
                location={requestLocation(r, lang)}
                cta={r.canRate ? t('list.rateNow') : undefined}
                pin
                onPress={() => router.push(`/reports/${r.id}`)}
              />
            ))}
          </View>
        )}
      </View>

      <BottomSheet
        visible={unitSheet}
        onClose={() => setUnitSheet(false)}
        title={t('home.chooseUnit')}
        options={units.map((u) => ({
          label: u.label,
          tone: u.unitId === unit?.unitId ? 'primary' : 'neutral',
          onPress: () => {
            setUnit(u.unitId);
            setUnitSheet(false);
          },
        }))}
      />
    </Screen>
  );
}
