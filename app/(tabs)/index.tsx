import { useRouter } from 'expo-router';
import {
  Activity,
  AlertTriangle,
  Archive,
  ArrowRight,
  CalendarCheck,
  CalendarClock,
  Camera,
  ChevronRight,
  ListChecks,
  RotateCcw,
  Star,
  type LucideIcon,
} from 'lucide-react-native';
import { useMemo, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { useNotifications, useRequests } from '@/api/queries';
import { byNewest, requestLocation, requestTitle } from '@/features/requests/labels';
import { ContactButtons } from '@/features/requests/ContactButtons';
import { UnitCard } from '@/features/units/UnitCard';
import { useQuickDraft } from '@/features/quick/draft';
import { useDraft } from '@/features/wizard/draft';
import { formatVisit } from '@/lib/relativeTime';
import { support, supportEmail } from '@/lib/support';
import { useActiveUnit } from '@/store/activeUnit';
import { currentLanguage } from '@/store/prefs';
import { BellButton, EmptyState, Header, ReportCard, Screen, Skeleton, useTheme } from '@/ui';

// Inicio: sigue el markup del prototipo (isHome) pieza por pieza.
export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const { palette } = useTheme(); // los íconos no toman clases de NativeWind
  const lang = currentLanguage();
  const { unit, units, loading: loadingUnits } = useActiveUnit();
  const requests = useRequests();
  const notifications = useNotifications();
  const draft = useDraft((s) => s.draft);
  const quickDraft = useQuickDraft((s) => s.draft);

  const mine = useMemo(
    () => (requests.data ?? []).filter((r) => !unit || r.unit.id === unit.unitId).sort(byNewest),
    [requests.data, unit],
  );
  const [now] = useState(() => Date.now()); // se recalcula al volver a montar
  const title = (r: (typeof mine)[number]) => requestTitle(r, lang, t('report.quickTitle'));
  const toSchedule = mine.find((r) => r.status.id === 4 && (r.proposedDates?.length ?? 0) > 0);
  const nextVisit = mine
    .filter((r) => r.status.id === 5 && r.visit?.scheduledAt && Date.parse(r.visit.scheduledAt) > now)
    .sort((a, b) => a.visit!.scheduledAt!.localeCompare(b.visit!.scheduledAt!))[0];
  const toRate = mine.filter((r) => r.canRate).length;
  const unread = (notifications.data ?? []).some((n) => !n.read);
  const count = (stage: 'status' | 'rating' | 'history') => mine.filter((r) => r.stage === stage).length;

  const refresh = () => {
    void requests.refetch();
    void notifications.refetch();
  };

  return (
    <Screen
      header={
        <Header
          title={t('home.title')}
          right={<BellButton unread={unread} onPress={() => router.push('/notifications')} />}
        />
      }
      onRefresh={refresh}
      refreshing={requests.isRefetching}
    >
      {loadingUnits ? (
        <Skeleton height={78} />
      ) : unit ? (
        <UnitCard unit={unit} units={units} />
      ) : (
        <EmptyState icon={AlertTriangle} title={t('home.noUnits')} text={t('home.noUnitsBody')} />
      )}

      {unit ? (
        <>
          {quickDraft || draft ? (
            <ActionCard
              border="border-brand-soft"
              icon={<RotateCcw size={20} color={palette.brandSoft} strokeWidth={2} />}
              title={t('home.draftTitle')}
              sub={[
                t('home.draftSub'),
                quickDraft?.media.length ? t('report.files', { count: quickDraft.media.length }) : null,
              ]
                .filter(Boolean)
                .join(' · ')}
              onPress={() => router.push(quickDraft ? '/reports/quick' : '/reports/wizard')}
              compact
            />
          ) : null}

          <QuickCta onPress={() => router.push('/reports/quick')} />
          <GuidedLink onPress={() => router.push('/reports/wizard')} />

          {toSchedule ? (
            <ActionCard
              border="border-warning"
              tile="bg-warning-tint"
              icon={<CalendarClock size={22} color={palette.warning} strokeWidth={2} />}
              title={t('home.chooseVisit')}
              sub={`${toSchedule.folio} · ${title(toSchedule)}`}
              onPress={() => router.push(`/reports/${toSchedule.id}`)}
            />
          ) : null}

          {nextVisit ? (
            <ActionCard
              border="border-success"
              tile="bg-success-tint"
              icon={<CalendarCheck size={22} color={palette.success} strokeWidth={2} />}
              label={t('home.nextVisit')}
              value={formatVisit(new Date(nextVisit.visit!.scheduledAt!), lang)}
              sub={`${nextVisit.folio} · ${title(nextVisit)}`}
              onPress={() => router.push(`/reports/${nextVisit.id}`)}
              chevron={false}
            />
          ) : null}

          <View className="gap-2.5">
            <SectionLabel>{t('home.followUp')}</SectionLabel>
            <View className="flex-row gap-2.5">
              <Tile
                icon={Activity}
                label={t('home.inProgress')}
                value={count('status')}
                loading={requests.isLoading}
                onPress={() => router.push({ pathname: '/reports', params: { tab: 'status' } })}
              />
              <Tile
                icon={Star}
                label={t('home.toRate')}
                value={count('rating')}
                loading={requests.isLoading}
                alert={toRate > 0}
                onPress={() => router.push({ pathname: '/reports', params: { tab: 'rating' } })}
              />
              <Tile
                icon={Archive}
                label={t('home.closed')}
                value={count('history')}
                loading={requests.isLoading}
                onPress={() => router.push({ pathname: '/reports', params: { tab: 'history' } })}
              />
            </View>
          </View>

          {toRate > 0 ? (
            <ActionCard
              border="border-warning"
              icon={<Star size={20} color={palette.warning} strokeWidth={2} />}
              title={t('home.pendingRating')}
              onPress={() => router.push({ pathname: '/reports', params: { tab: 'rating' } })}
              compact
              plain
            />
          ) : null}

          <View className="gap-2.5">
            <View className="flex-row items-baseline justify-between">
              <SectionLabel>{t('home.recent')}</SectionLabel>
              <Pressable onPress={() => router.push('/reports')} accessibilityRole="button" hitSlop={12}>
                <Text className="text-caption text-brand-soft">{t('home.seeAll')}</Text>
              </Pressable>
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
              mine
                .slice(0, 2)
                .map((r) => (
                  <ReportCard
                    key={r.id}
                    folio={r.folio}
                    statusId={r.status.id}
                    createdAt={new Date(r.createdAt)}
                    title={title(r)}
                    location={requestLocation(r, lang)}
                    onPress={() => router.push(`/reports/${r.id}`)}
                  />
                ))
            )}
          </View>

          <View className="gap-3 rounded-md border border-border bg-surface-1 p-4">
            <View className="gap-0.5">
              <Text className="text-body font-semibold leading-[1.375rem] text-text">
                {t('home.helpTitle')}
              </Text>
              <Text className="text-caption text-text-soft">{t('home.helpBody')}</Text>
            </View>
            <ContactButtons />
            {/* Fuera de horario la atención es por correo. */}
            <Pressable
              onPress={() => support.email()}
              accessibilityRole="link"
              className="min-h-11 items-center justify-center self-center px-3"
            >
              <Text className="text-[0.875rem] text-brand-soft">
                {t('home.helpEmail', { email: supportEmail })}
              </Text>
            </Pressable>
          </View>
        </>
      ) : null}
    </Screen>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Text className="text-label font-medium text-text-mute" accessibilityRole="header">
      {children}
    </Text>
  );
}

// CTA principal: relleno brand, mosaico ink-tint con la cámara y flecha.
function QuickCta({ onPress }: { onPress: () => void }) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${t('home.quickTitle')}. ${t('home.quickSub')}`}
      className="flex-row items-center gap-4 rounded-md bg-brand p-5 active:opacity-80"
    >
      <View className="h-12 w-12 items-center justify-center rounded-md bg-ink/[0.14]">
        <Camera size={24} color={palette.ink} strokeWidth={2} />
      </View>
      <View className="min-w-0 flex-1">
        <Text className="text-[1.1875rem] font-semibold leading-6 text-ink">{t('home.quickTitle')}</Text>
        <Text className="mt-0.5 text-caption text-ink/[0.72]">{t('home.quickSub')}</Text>
      </View>
      <ArrowRight size={20} color={palette.ink} strokeWidth={2} />
    </Pressable>
  );
}

function GuidedLink({ onPress }: { onPress: () => void }) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="-mt-2.5 min-h-11 flex-row items-center gap-1.5 self-center px-3"
    >
      <ListChecks size={16} color={palette.brandSoft} strokeWidth={2} />
      <Text className="text-[0.875rem] text-brand-soft">{t('home.guidedLink')}</Text>
    </Pressable>
  );
}

type ActionCardProps = {
  border: string;
  tile?: string; // fondo del mosaico del ícono; sin él, ícono suelto
  icon: ReactNode;
  title?: string;
  label?: string;
  value?: string;
  sub?: string;
  onPress: () => void;
  chevron?: boolean;
  compact?: boolean; // padding 14 × 16 (borrador, aviso de calificación)
  plain?: boolean; // título sin negritas
};

// Tarjetas con borde de color (agendar, próxima visita, borrador, calificar).
function ActionCard({
  border,
  tile,
  icon,
  title,
  label,
  value,
  sub,
  onPress,
  chevron = true,
  compact,
  plain,
}: ActionCardProps) {
  const { palette } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={[label, value, title, sub].filter(Boolean).join('. ')}
      className={`flex-row items-center rounded-md border bg-surface-1 ${border} ${compact ? 'gap-3 px-4 py-3.5' : 'gap-3.5 p-4'} active:opacity-80`}
    >
      {tile ? (
        <View className={`h-11 w-11 items-center justify-center rounded-md ${tile}`}>{icon}</View>
      ) : (
        icon
      )}
      <View className="min-w-0 flex-1">
        {label ? <Text className="text-label font-medium text-text-mute">{label}</Text> : null}
        {value ? <Text className="mt-0.5 text-body-lg text-text">{value}</Text> : null}
        {title ? (
          <Text className={`text-body text-text ${plain || compact ? '' : 'font-semibold'}`}>{title}</Text>
        ) : null}
        {sub ? <Text className="mt-0.5 text-caption text-text-soft">{sub}</Text> : null}
      </View>
      {chevron ? <ChevronRight size={18} color={palette.textMute} strokeWidth={2} /> : null}
    </Pressable>
  );
}

function Tile({
  icon: Icon,
  label,
  value,
  loading,
  alert,
  onPress,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  loading?: boolean;
  alert?: boolean;
  onPress: () => void;
}) {
  const { palette } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value}`}
      className="min-h-[6.5rem] flex-1 justify-between gap-2 rounded-md border border-border bg-surface-1 p-3 active:opacity-80"
    >
      <Icon size={20} color={palette.brandSoft} strokeWidth={2} />
      <View>
        <Text className="text-[1.375rem] font-semibold leading-[1.625rem] text-text">
          {loading ? '–' : value}
        </Text>
        <Text className="text-label text-text-soft">{label}</Text>
      </View>
      {alert ? <View className="absolute right-2.5 top-2.5 h-2 w-2 rounded-pill bg-warning" /> : null}
    </Pressable>
  );
}
