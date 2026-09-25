import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, Pressable, Text, View } from 'react-native';

import { appApi } from '@/api/app';
import { errorText } from '@/api/client';
import { keys, useAreaEquipment, useEquipmentProblems, useUnitAreas } from '@/api/queries';
import { MAX_PHOTOS } from '@/features/media/media';
import { useMediaPicker } from '@/features/media/useMediaPicker';
import { requestForm } from '@/features/requests/form';
import { loc } from '@/features/requests/labels';
import { useDraft, withArea, withEquipment, type Draft } from '@/features/wizard/draft';
import { useActiveUnit, useActiveUnitStore } from '@/store/activeUnit';
import { currentLanguage } from '@/store/prefs';
import {
  BottomSheet,
  Button,
  Chip,
  EmptyState,
  ErrorMessage,
  Field,
  Header,
  MediaSlot,
  Screen,
  Skeleton,
  StepIndicator,
} from '@/ui';

type Step = 'unit' | 'area' | 'equipment' | 'problem' | 'comment' | 'evidence' | 'summary';

// Wizard guiado: [unidad si hay más de una] → área → equipo → problema →
// comentario → evidencia → resumen. Todo se guarda en el borrador.
export default function Wizard() {
  const { t } = useTranslation();
  const router = useRouter();
  const qc = useQueryClient();
  const lang = currentLanguage();
  const { unit: activeUnit, units } = useActiveUnit();
  const setActiveUnit = useActiveUnitStore((s) => s.setUnit);
  const { draft: stored, update, clear } = useDraft();
  const draft: Draft = stored ?? { description: '', media: [], step: 0, unitId: activeUnit?.unitId };
  const unitId = draft.unitId ?? activeUnit?.unitId;

  const steps: Step[] = useMemo(
    () => [...(units.length > 1 ? (['unit'] as Step[]) : []), 'area', 'equipment', 'problem', 'comment', 'evidence', 'summary'],
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
  const picker = useMediaPicker((m) =>
    update({ media: m.kind === 'video' ? [...draft.media.filter((x) => x.kind !== 'video'), m] : [...draft.media, m] }),
  );

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
      router.replace({ pathname: '/report/sent', params: { kind: 'guided', folio: data.folio } });
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
  const hint: Partial<Record<Step, string>> = {
    unit: t('report.selUnit'),
    area: t('report.selArea'),
    equipment: t('report.selEquip'),
    problem: t('report.selProb'),
    summary: t('report.summaryHelp'),
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
  const evidenceSummary =
    draft.media.length === 0
      ? t('report.none')
      : `${t('report.photos', { count: photos.length })}${video ? ` ${t('report.withVideo')}` : ''}`;

  const summaryRows: { step: Step; label: string; value: string }[] = [
    ...(units.length > 1 ? [{ step: 'unit' as Step, label: t('report.unit'), value: selectedUnit?.label ?? '' }] : []),
    { step: 'area', label: t('report.area'), value: draft.area ? loc(draft.area.name, lang) : '' },
    { step: 'equipment', label: t('report.equipment'), value: draft.equipment ? loc(draft.equipment.name, lang) : '' },
    { step: 'problem', label: t('report.problem'), value: draft.problem ? loc(draft.problem.name, lang) : '' },
    { step: 'comment', label: t('report.comments'), value: draft.description.trim() || t('report.none') },
    { step: 'evidence', label: t('report.evidence'), value: evidenceSummary },
  ];

  return (
    <Screen
      header={<Header title={t('report.quickTitle')} back={() => (index > 0 ? go(index - 1) : setLeaving(true))} />}
      footer={
        <View className="gap-3">
          {error ? <ErrorMessage message={error} /> : null}
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Button
                label={t('common.back')}
                variant="secondary"
                onPress={() => (index > 0 ? go(index - 1) : setLeaving(true))}
                fullWidth
              />
            </View>
            <View className="flex-1">
              {step === 'summary' ? (
                <Button label={t('report.send')} onPress={send} loading={sending} fullWidth />
              ) : (
                <Button label={t('common.next')} onPress={next} fullWidth />
              )}
            </View>
          </View>
        </View>
      }
    >
      <StepIndicator current={index + 1} total={steps.length} />
      <View className="gap-2">
        <Text className="text-title font-semibold text-text" accessibilityRole="header">
          {question[step]}
        </Text>
        {hint[step] ? <Text className="text-body text-text-soft">{hint[step]}</Text> : null}
      </View>

      {step === 'unit' ? (
        <View className="flex-row flex-wrap gap-2" accessibilityRole="radiogroup">
          {units.map((u) => (
            <Chip
              key={u.unitId}
              label={`${u.label} · ${u.name}`}
              selected={unitId === u.unitId}
              onPress={() => {
                // Cambiar de vivienda reinicia la clasificación.
                update({ unitId: u.unitId, area: undefined, equipment: undefined, problem: undefined });
                setActiveUnit(u.unitId);
              }}
            />
          ))}
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
        <Field
          label={t('report.comments')}
          value={draft.description}
          onChangeText={(description) => update({ description })}
          placeholder={t('report.commentPh')}
          hint={`${t('report.commentHelp')} ${draft.description.length}/1500`}
          multiline
          maxLength={1500}
        />
      ) : null}

      {step === 'evidence' ? (
        <View className="gap-3">
          <Text className="text-body text-text-soft">{t('report.mediaHelp')}</Text>
          <View className="flex-row gap-3">
            {Array.from({ length: MAX_PHOTOS }, (_, i) => {
              const m = photos[i];
              return (
                <MediaSlot
                  key={`p${i}`}
                  kind="photo"
                  index={i + 1}
                  uri={m?.uri}
                  onPress={() => (m ? setSelected(draft.media.indexOf(m)) : picker.open('photo'))}
                />
              );
            })}
            <MediaSlot
              kind="video"
              uri={video?.uri}
              onPress={() => (video ? setSelected(draft.media.indexOf(video)) : picker.open('video'))}
            />
          </View>
        </View>
      ) : null}

      {step === 'summary' ? (
        <View className="overflow-hidden rounded-md border border-border bg-surface-1">
          {summaryRows.map((row, i) => (
            <Pressable
              key={row.step}
              onPress={() => go(steps.indexOf(row.step))}
              accessibilityRole="button"
              accessibilityLabel={`${row.label}: ${row.value}. ${t('report.edit')}`}
              className={`flex-row items-center gap-3 px-4 py-3.5 active:opacity-80 ${i > 0 ? 'border-t border-border' : ''}`}
            >
              <View className="flex-1 gap-0.5">
                <Text className="text-label font-medium text-text-mute">{row.label}</Text>
                <Text className="text-body text-text" numberOfLines={3}>
                  {row.value}
                </Text>
              </View>
              <Text className="text-caption font-medium text-brand-soft">{t('report.edit')}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      {picker.sheets}
      <BottomSheet
        visible={selected !== null}
        onClose={() => setSelected(null)}
        title={t('report.evidence')}
        hideCancel={false}
        options={[
          {
            label: t('report.remove'),
            tone: 'danger',
            onPress: () => {
              update({ media: draft.media.filter((_, i) => i !== selected) });
              setSelected(null);
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
