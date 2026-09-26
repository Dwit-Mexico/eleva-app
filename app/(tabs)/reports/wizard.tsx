import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Check, ChevronRight, RefreshCw, Trash2 } from 'lucide-react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, Pressable, Text, TextInput, useWindowDimensions, View } from 'react-native';

import { appApi } from '@/api/app';
import { errorText } from '@/api/client';
import { keys, useAreaEquipment, useEquipmentProblems, useUnitAreas } from '@/api/queries';
import { MAX_PHOTOS } from '@/features/media/media';
import { MediaViewer } from '@/features/media/MediaViewer';
import { useMediaPicker } from '@/features/media/useMediaPicker';
import { requestForm } from '@/features/requests/form';
import { loc } from '@/features/requests/labels';
import { useDraft, withArea, withEquipment, type Draft } from '@/features/wizard/draft';
import { useActiveUnit, useActiveUnitStore } from '@/store/activeUnit';
import { currentLanguage } from '@/store/prefs';
import { needsNetwork } from '@/features/offline/guard';
import {
  BottomSheet,
  Button,
  Chip,
  EmptyState,
  ErrorMessage,
  Header,
  MediaSlot,
  Screen,
  Skeleton,
  StepIndicator,
  useTheme,
} from '@/ui';

type Step = 'unit' | 'area' | 'equipment' | 'problem' | 'comment' | 'evidence' | 'summary';

// Wizard guiado: [unidad si hay más de una] → área → equipo → problema →
// comentario → evidencia → resumen. Todo se guarda en el borrador.
export default function Wizard() {
  const { t } = useTranslation();
  const router = useRouter();
  const qc = useQueryClient();
  const { palette } = useTheme();
  const { fontScale } = useWindowDimensions();
  const lang = currentLanguage();
  const { unit: activeUnit, units } = useActiveUnit();
  const setActiveUnit = useActiveUnitStore((s) => s.setUnit);
  const { draft: stored, update, clear } = useDraft();
  const draft: Draft = stored ?? { description: '', media: [], step: 0, unitId: activeUnit?.unitId };
  const unitId = draft.unitId ?? activeUnit?.unitId;

  const steps: Step[] = useMemo(
    () => [
      ...(units.length > 1 ? (['unit'] as Step[]) : []),
      'area',
      'equipment',
      'problem',
      'comment',
      'evidence',
      'summary',
    ],
    [units.length],
  );
  const index = Math.min(draft.step, steps.length - 1);
  const step = steps[index]!;

  const areas = useUnitAreas(unitId);
  const equipment = useAreaEquipment(draft.area?.id);
  const problems = useEquipmentProblems(draft.equipment?.equipmentId);

  const [error, setError] = useState<string>();
  const [sending, setSending] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  // Reemplazar desde el visor cambia esa misma posición.
  const replacing = useRef<number | null>(null);
  const picker = useMediaPicker((m) => {
    const at = replacing.current;
    replacing.current = null;
    if (at !== null) return update({ media: draft.media.map((x, i) => (i === at ? m : x)) });
    update({
      media: m.kind === 'video' ? [...draft.media.filter((x) => x.kind !== 'video'), m] : [...draft.media, m],
    });
  });

  const go = (i: number) => {
    setError(undefined);
    update({ step: i, unitId });
  };

  // El botón atrás del sistema pregunta antes de salir.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (index > 0) go(index - 1);
      else setLeaving(true);
      return true;
    });
    return () => sub.remove();
  });

  const validate = (): string | undefined => {
    if (step === 'unit' && !unitId) return t('report.selUnit');
    if (step === 'area' && !draft.area) return t('report.selArea');
    if (step === 'equipment' && !draft.equipment) return t('report.selEquip');
    if (step === 'problem' && !draft.problem) return t('report.selProb');
    return undefined;
  };

  const next = () => {
    const e = validate();
    if (e) return setError(e);
    go(index + 1);
  };

  const send = async () => {
    if (!unitId || !draft.area || !draft.equipment || !draft.problem) return;
    setSending(true);
    setError(undefined);
    try {
      const form = requestForm(
        {
          unitId,
          areaId: draft.area.areaId,
          equipmentId: draft.equipment.equipmentId,
          problemId: draft.problem.id,
          description: draft.description.trim(),
        },
        draft.media,
      );
      const { data } = await appApi.createRequest(form);
      clear();
      void qc.invalidateQueries({ queryKey: keys.requests });
      router.replace({ pathname: '/reports/sent', params: { kind: 'guided', folio: data.folio } });
    } catch (e) {
      setError(errorText(e, lang));
    } finally {
      setSending(false);
    }
  };

  const question: Record<Step, string> = {
    unit: t('report.qUnit'),
    area: t('report.qArea'),
    equipment: t('report.qEquip'),
    problem: t('report.qProb'),
    comment: t('report.qComment'),
    evidence: t('report.qPhotos'),
    summary: t('report.qSummary'),
  };

  // Opciones con carga, error y lista vacía.
  const options = (
    q: { isLoading: boolean; isError: boolean; refetch: () => unknown },
    items: { key: number; label: string; selected: boolean; onPress: () => void }[],
  ) => {
    if (q.isLoading)
      return (
        <View className="gap-2">
          <Skeleton height={44} />
          <Skeleton height={44} />
        </View>
      );
    if (q.isError)
      return (
        <EmptyState
          icon={ChevronRight}
          title={t('home.loadError')}
          action={{ label: t('common.retry'), onPress: () => void q.refetch() }}
        />
      );
    if (items.length === 0) return <Text className="text-body text-text-soft">{t('report.noOptions')}</Text>;
    return (
      <View className="flex-row flex-wrap gap-2" accessibilityRole="radiogroup">
        {items.map((i) => (
          <Chip key={i.key} label={i.label} selected={i.selected} onPress={i.onPress} />
        ))}
      </View>
    );
  };

  const selectedUnit = units.find((u) => u.unitId === unitId);
  const photos = draft.media.filter((m) => m.kind === 'photo');
  const video = draft.media.find((m) => m.kind === 'video');

  const rawRows: { step: Step; label: string; value: string }[] = [
    { step: 'unit', label: t('report.unit'), value: selectedUnit?.label ?? '' },
    { step: 'area', label: t('report.area'), value: draft.area ? loc(draft.area.name, lang) : '' },
    {
      step: 'equipment',
      label: t('report.equipment'),
      value: draft.equipment ? loc(draft.equipment.name, lang) : '',
    },
    {
      step: 'problem',
      label: t('report.problem'),
      value: draft.problem ? loc(draft.problem.name, lang) : '',
    },
    { step: 'comment', label: t('report.comments'), value: draft.description.trim() },
    {
      step: 'evidence',
      label: t('report.evidence'),
      value: draft.media.length ? t('report.files', { count: draft.media.length }) : '',
    },
  ];
  // Solo los pasos que existen (la vivienda, si hay más de una); vacías en cursiva.
  const summaryRows = rawRows
    .filter((r) => steps.includes(r.step))
    .map((r) => ({ ...r, value: r.value || t('report.none'), empty: !r.value }));

  return (
    <Screen
      header={
        <>
          <Header
            title={t('report.newReport')}
            subtitle={fontScale > 1 ? undefined : selectedUnit?.label}
            back={() => (index > 0 ? go(index - 1) : setLeaving(true))}
          />
          <View className="gap-2 px-5 pt-4">
            <StepIndicator current={index + 1} total={steps.length} />
          </View>
        </>
      }
      footer={
        <View className="gap-3">
          {error ? <ErrorMessage message={error} /> : null}
          <View className="flex-row gap-2.5">
            {index > 0 ? (
              <View className="flex-1">
                <Button
                  label={t('common.back')}
                  variant="secondary"
                  onPress={() => go(index - 1)}
                  fullWidth
                />
              </View>
            ) : null}
            <View className="flex-[2]">
              {step === 'summary' ? (
                <Button label={t('report.send')} onPress={needsNetwork(send)} loading={sending} fullWidth />
              ) : (
                <Button label={t('common.next')} onPress={next} fullWidth />
              )}
            </View>
          </View>
        </View>
      }
    >
      <Text className="text-title font-semibold text-text" accessibilityRole="header">
        {question[step]}
      </Text>

      {step === 'unit' ? (
        <View className="gap-2" accessibilityRole="radiogroup">
          {units.map((u) => {
            const on = unitId === u.unitId;
            return (
              <Pressable
                key={u.unitId}
                onPress={() => {
                  // Cambiar de vivienda reinicia la clasificación.
                  update({ unitId: u.unitId, area: undefined, equipment: undefined, problem: undefined });
                  setActiveUnit(u.unitId);
                }}
                accessibilityRole="radio"
                accessibilityState={{ selected: on }}
                className={`min-h-16 flex-row items-center gap-3 rounded-md border bg-surface-1 px-4 py-3.5 ${on ? 'border-brand' : 'border-border'}`}
              >
                <View className="min-w-0 flex-1">
                  <Text className="text-body-lg text-text">{u.label}</Text>
                  {u.address ? <Text className="text-caption text-text-soft">{u.address}</Text> : null}
                </View>
                {on ? <Check size={20} color={palette.brand} strokeWidth={2} /> : null}
              </Pressable>
            );
          })}
        </View>
      ) : null}

      {step === 'area'
        ? options(
            areas,
            (areas.data ?? []).map((a) => ({
              key: a.id,
              label: loc(a.name, lang),
              selected: draft.area?.id === a.id,
              onPress: () => update(withArea(a)),
            })),
          )
        : null}

      {step === 'equipment'
        ? options(
            equipment,
            (equipment.data ?? []).map((e) => ({
              key: e.id,
              label: loc(e.name, lang),
              selected: draft.equipment?.id === e.id,
              onPress: () => update(withEquipment(e)),
            })),
          )
        : null}

      {step === 'problem'
        ? options(
            problems,
            (problems.data ?? []).map((p) => ({
              key: p.id,
              label: loc(p.name, lang),
              selected: draft.problem?.id === p.id,
              onPress: () => update({ problem: p }),
            })),
          )
        : null}

      {step === 'comment' ? (
        <View className="gap-2">
          <TextInput
            value={draft.description}
            onChangeText={(description) => update({ description })}
            placeholder={t('report.commentPh')}
            placeholderTextColor={palette.textMute}
            selectionColor={palette.brand}
            multiline
            maxLength={1500}
            accessibilityLabel={t('report.qComment')}
            className="min-h-[11rem] rounded-sm border border-border bg-surface-2 p-3.5 text-body text-text"
            style={{ textAlignVertical: 'top' }}
          />
          <View className="flex-row justify-between gap-3">
            <Text className="flex-1 text-label text-text-mute">{t('report.commentHelp')}</Text>
            <Text className="text-label text-text-mute">{draft.description.length}/1500</Text>
          </View>
        </View>
      ) : null}

      {step === 'evidence' ? (
        <View className="gap-3">
          <View className="flex-row flex-wrap gap-3">
            {Array.from({ length: MAX_PHOTOS }, (_, i) => {
              const m = photos[i];
              return (
                <View key={`p${i}`} className="w-[47.5%]">
                  <MediaSlot
                    kind="photo"
                    index={i + 1}
                    uri={m?.uri}
                    onPress={() => (m ? setSelected(draft.media.indexOf(m)) : picker.open('photo'))}
                  />
                </View>
              );
            })}
            <View className="w-[47.5%]">
              <MediaSlot
                kind="video"
                uri={video?.uri}
                onPress={() => (video ? setSelected(draft.media.indexOf(video)) : picker.open('video'))}
              />
            </View>
          </View>
          <Text className="text-caption text-text-mute">{t('report.mediaHelp')}</Text>
        </View>
      ) : null}

      {step === 'summary' ? (
        <View className="gap-4">
          <Text className="text-body text-text-soft">{t('report.summaryHelp')}</Text>
          <View className="overflow-hidden rounded-md border border-border bg-surface-1">
            {summaryRows.map((row, i) => (
              <Pressable
                key={row.step}
                onPress={() => go(steps.indexOf(row.step))}
                accessibilityRole="button"
                accessibilityLabel={`${row.label}: ${row.value}. ${t('report.edit')}`}
                className={`min-h-14 flex-row items-center gap-3 px-4 py-3 active:opacity-80 ${i < summaryRows.length - 1 ? 'border-b border-surface-2' : ''}`}
              >
                <Text className="w-[5.25rem] text-label font-medium text-text-mute">{row.label}</Text>
                <Text
                  className={`min-w-0 flex-1 text-body ${row.empty ? 'italic text-text-mute' : 'text-text'}`}
                  numberOfLines={3}
                >
                  {row.value}
                </Text>
                <Text className="text-caption font-semibold text-brand-soft">{t('report.edit')}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}

      {picker.sheets}
      <MediaViewer
        items={draft.media.map((m) => ({ kind: m.kind, uri: m.uri }))}
        index={selected}
        onIndex={setSelected}
        onClose={() => setSelected(null)}
        caption={t('media.pending')}
        actions={[
          {
            label: t('media.replace'),
            icon: RefreshCw,
            onPress: (i) => {
              setSelected(null);
              replacing.current = i;
              picker.open(draft.media[i]?.kind ?? 'photo');
            },
          },
          {
            label: t('media.remove'),
            icon: Trash2,
            danger: true,
            onPress: (i) => {
              setSelected(null);
              update({ media: draft.media.filter((_, j) => j !== i) });
            },
          },
        ]}
      />
      <BottomSheet
        visible={leaving}
        onClose={() => setLeaving(false)}
        title={t('report.discardTitle')}
        body={t('report.discardBody')}
        cancelLabel={t('report.discardKeep')}
        options={[
          {
            label: t('report.discardExit'),
            tone: 'primary',
            onPress: () => {
              setLeaving(false);
              router.back();
            },
          },
          {
            label: t('report.discardDelete'),
            tone: 'danger',
            onPress: () => {
              setLeaving(false);
              clear();
              router.back();
            },
          },
        ]}
      />
    </Screen>
  );
}
