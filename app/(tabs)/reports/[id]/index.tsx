import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AlertTriangle, CalendarClock, MessagesSquare, Play, Star } from 'lucide-react-native';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { appApi } from '@/api/app';
import { errorText } from '@/api/client';
import { keys, useRequest, useThreads } from '@/api/queries';
import type { Request } from '@/api/schemas';
import { MediaViewer } from '@/features/media/MediaViewer';
import { ContactButtons } from '@/features/requests/ContactButtons';
import { canCancel, canSchedule, nextStep, ownerMedia, timelineOf } from '@/features/requests/detail';
import { loc, requestLocation, requestTitle } from '@/features/requests/labels';
import { formatDate, formatVisit, relativeTime } from '@/lib/relativeTime';
import { currentLanguage } from '@/store/prefs';
import { BottomSheet, EmptyState, ErrorMessage, Header, Screen, Skeleton, StatusBadge, useTheme } from '@/ui';
import { needsNetwork } from '@/features/offline/guard';

// Detalle del reporte (prototipo: isDetail).
export default function RequestDetail() {
  const { t } = useTranslation();
  const router = useRouter();
  const qc = useQueryClient();
  const lang = currentLanguage();
  const { id } = useLocalSearchParams<{ id: string }>();
  const rid = Number(id);
  const query = useRequest(rid);
  const r = query.data;
  const [cancelSheet, setCancelSheet] = useState(false);
  const [cancelError, setCancelError] = useState<string>();

  const cancel = async () => {
    setCancelSheet(false);
    try {
      await appApi.cancel(rid);
      await qc.invalidateQueries({ queryKey: keys.requests });
      router.dismissTo({ pathname: '/reports', params: { tab: 'history' } });
    } catch (e) {
      setCancelError(errorText(e, lang));
    }
  };

  return (
    <Screen
      header={<Header title={r?.folio ?? ''} subtitle={r ? requestLocation(r, lang) : undefined} back />}
      onRefresh={() => void query.refetch()}
      refreshing={query.isRefetching}
      bodyClassName="gap-4 px-5 pb-7 pt-4"
    >
      {r ? (
        <Body r={r} onCancel={needsNetwork(() => setCancelSheet(true))} cancelError={cancelError} />
      ) : query.isLoading ? (
        <>
          <Skeleton height={28} />
          <Skeleton height={240} />
          <Skeleton height={56} />
        </>
      ) : (
        <EmptyState
          bare
          tone="danger"
          icon={AlertTriangle}
          title={t('detail.notFound')}
          action={{ label: t('common.retry'), onPress: () => void query.refetch() }}
        />
      )}
      <BottomSheet
        visible={cancelSheet}
        onClose={() => setCancelSheet(false)}
        title={t('detail.cancelQ')}
        body={t('detail.cancelBody')}
        options={[{ label: t('detail.cancelCta'), tone: 'danger', onPress: cancel }]}
      />
    </Screen>
  );
}

function Body({ r, onCancel, cancelError }: { r: Request; onCancel: () => void; cancelError?: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { palette } = useTheme();
  const lang = currentLanguage();
  const created = new Date(r.createdAt);
  const visit = r.visit?.scheduledAt ? new Date(r.visit.scheduledAt) : null;
  const next = nextStep(r);
  const NextIcon = next.icon;
  const media = ownerMedia(r);
  const [viewer, setViewer] = useState<number | null>(null);
  const pending = r.needsClassification ? t('detail.toClassify') : null;
  const rows = [
    { k: t('detail.unit'), v: r.unit.name },
    { k: t('detail.area'), v: pending ?? loc(r.area.name, lang) },
    { k: t('detail.equipment'), v: pending ?? loc(r.equipment.name, lang) },
    { k: t('detail.problem'), v: pending ?? loc(r.problem.name, lang) },
  ];
  const stars = t('detail.stars', { returnObjects: true }) as string[];
  const score = r.rating?.score ?? 0;

  return (
    <>
      <View className="flex-row flex-wrap items-center gap-2.5">
        <StatusBadge statusId={r.status.id} />
        <Text className="ml-auto text-caption text-text-soft">
          {relativeTime(created, t)} · {formatDate(created)}
        </Text>
      </View>
      <Text className="text-title font-semibold tracking-[-0.22px] text-text">
        {requestTitle(r, lang, t('report.quickTitle'))}
      </Text>

      {/* Línea de tiempo y "qué sigue" */}
      <View className="gap-3.5 rounded-md border border-border bg-surface-1 p-4">
        <Label>{t('detail.timeline')}</Label>
        {timelineOf(r).map((s, i, all) => {
          const color =
            s.state === 'done' ? palette.success : s.state === 'now' ? palette.brandSoft : palette.border;
          const meta =
            s.key === 'received'
              ? formatDate(created)
              : s.key === 'scheduled' && visit
                ? formatVisit(visit, lang)
                : null;
          return (
            <View key={s.key} className="flex-row gap-3">
              <View className="items-center gap-1">
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    borderWidth: 2,
                    borderColor: color,
                    backgroundColor: s.state === 'todo' ? 'transparent' : color,
                    marginTop: 5,
                  }}
                />
                <View
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 14,
                    backgroundColor:
                      s.state === 'done' && all[i + 1]?.state === 'done' ? palette.success : palette.surface2,
                    opacity: i === all.length - 1 ? 0 : 1,
                  }}
                />
              </View>
              <View className="min-w-0 flex-1 pb-0.5">
                <Text
                  className={`text-body leading-[1.375rem] ${s.state === 'todo' ? 'text-text-mute' : 'text-text'} ${s.state === 'now' ? 'font-semibold' : ''}`}
                >
                  {t(`detail.steps.${s.key}`)}
                </Text>
                {meta ? <Text className="text-caption text-text-soft">{meta}</Text> : null}
              </View>
            </View>
          );
        })}
        <View className="flex-row gap-2.5 rounded-sm bg-surface-2 px-3.5 py-3">
          <NextIcon size={18} color={palette.brandSoft} strokeWidth={2} style={{ marginTop: 2 }} />
          <View className="min-w-0 flex-1">
            <Label>{t('detail.whatsNext')}</Label>
            <Text className="mt-0.5 text-body leading-[1.375rem] text-text">
              {t(next.key, { date: visit ? formatVisit(visit, lang) : '' })}
            </Text>
          </View>
        </View>
      </View>

      <MessagesCard requestId={r.id} onPress={() => router.push(`/reports/${r.id}/messages`)} />

      {/* Unidad, área, equipo, problema */}
      <View className="overflow-hidden rounded-md border border-border bg-surface-1">
        {rows.map((row, i) => (
          <View
            key={row.k}
            className={`flex-row items-baseline gap-4 px-4 py-3 ${i < rows.length - 1 ? 'border-b border-surface-2' : ''}`}
          >
            <Text className="w-[5.5rem] text-label font-medium text-text-mute">{row.k}</Text>
            <Text
              className={`flex-1 text-body leading-[1.375rem] ${row.v === pending ? 'italic text-text-mute' : 'text-text'}`}
            >
              {row.v}
            </Text>
          </View>
        ))}
      </View>

      <View className="gap-2">
        <Label>{t('detail.comments')}</Label>
        <View
          className={`rounded-md border bg-surface-1 px-4 py-3.5 ${r.description ? 'border-border' : 'border-dashed border-border'}`}
        >
          <Text
            className={`text-body leading-[1.375rem] ${r.description ? 'text-text' : 'italic text-text-mute'}`}
          >
            {r.description || t('detail.noComment')}
          </Text>
        </View>
      </View>

      {media.length ? (
        <View className="gap-2">
          <Label>{t('detail.evidence')}</Label>
          <View className="flex-row flex-wrap gap-2">
            {media.map((m, i) => (
              <Pressable
                key={m.url}
                onPress={() => setViewer(i)}
                accessibilityRole="imagebutton"
                accessibilityLabel={m.kind === 'video' ? t('detail.video') : t('media.photo', { n: i + 1 })}
                className="aspect-square w-[31.5%] overflow-hidden rounded-sm border border-border bg-surface-1"
              >
                {m.kind === 'photo' ? (
                  <Image source={{ uri: m.url }} style={{ flex: 1 }} contentFit="cover" transition={150} />
                ) : (
                  <View className="flex-1 items-center justify-center bg-surface-2">
                    <View className="h-9 w-9 items-center justify-center rounded-pill bg-ink/[0.72]">
                      <Play size={16} color={palette.brandSoft} fill={palette.brandSoft} />
                    </View>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}

      {r.canRate ? (
        <Cta
          icon={<Star size={18} color={palette.ink} strokeWidth={2} />}
          label={t('detail.rateNow')}
          onPress={needsNetwork(() => router.push(`/reports/${r.id}/rate`))}
        />
      ) : null}
      {canSchedule(r) ? (
        <Cta
          icon={<CalendarClock size={18} color={palette.ink} strokeWidth={2} />}
          label={t('detail.schedule')}
          onPress={needsNetwork(() => router.push(`/reports/${r.id}/schedule`))}
        />
      ) : null}
      {score > 0 ? (
        <View className="flex-row items-center gap-2.5 rounded-md border border-border bg-surface-1 px-4 py-3.5">
          <Star size={18} color={palette.brandSoft} fill={palette.brandSoft} strokeWidth={2} />
          <Text className="flex-1 text-body leading-[1.375rem] text-text-soft">
            {t('detail.rated')} · {stars[score - 1]}
          </Text>
        </View>
      ) : null}

      <ContactButtons folio={r.folio} />

      <MediaViewer
        items={media.map((m) => ({ kind: m.kind, uri: m.url }))}
        index={viewer}
        onIndex={setViewer}
        onClose={() => setViewer(null)}
        caption={t('media.sentOn', { date: formatDate(created) })}
      />

      {cancelError ? <ErrorMessage message={cancelError} /> : null}
      {canCancel(r) ? (
        <Pressable
          onPress={onCancel}
          accessibilityRole="button"
          className="min-h-11 items-center justify-center self-center px-3"
        >
          <Text className="text-[0.875rem] text-danger">{t('detail.cancelReport')}</Text>
        </Pressable>
      ) : null}
    </>
  );
}

// Mensajes: sin leer desde el resumen (leer el hilo lo marca como leído).
function MessagesCard({ requestId, onPress }: { requestId: number; onPress: () => void }) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const thread = useThreads().data?.find((x) => x.requestId === requestId);
  const sub = thread?.lastText
    ? thread.lastText
    : thread?.unread
      ? t('detail.unread', { count: thread.unread })
      : thread?.total
        ? t('detail.lastMessage', { when: relativeTime(new Date(thread.lastAt), t) })
        : t('detail.noMessages');
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${t('detail.messages')}. ${sub}`}
      className="min-h-14 flex-row items-center gap-3 rounded-md border border-border bg-surface-1 px-4 py-3.5 active:opacity-80"
    >
      <MessagesSquare size={20} color={palette.brandSoft} strokeWidth={2} />
      <View className="min-w-0 flex-1">
        <Text className="text-[1rem] leading-[1.375rem] text-text">{t('detail.messages')}</Text>
        <Text className="text-caption text-text-soft" numberOfLines={3}>
          {sub}
        </Text>
      </View>
      {thread?.unread ? (
        <View className="h-[1.375rem] min-w-[1.375rem] items-center justify-center rounded-pill bg-brand px-[0.4375rem]">
          <Text className="text-label font-semibold text-ink">{thread.unread}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <Text className="text-label font-medium text-text-mute">{children}</Text>;
}

function Cta({ icon, label, onPress }: { icon: ReactNode; label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="min-h-13 flex-row items-center justify-center gap-2 rounded-md bg-brand active:opacity-80"
    >
      {icon}
      <Text className="text-[1rem] font-semibold text-ink">{label}</Text>
    </Pressable>
  );
}
