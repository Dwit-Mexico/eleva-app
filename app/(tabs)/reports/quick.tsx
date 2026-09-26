import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {
  AlertCircle,
  Building2,
  Camera,
  CheckCircle2,
  Info,
  Play,
  Plus,
  RefreshCw,
  Trash2,
  Video,
  X,
} from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, Pressable, Text, TextInput, View } from 'react-native';

import { appApi } from '@/api/app';
import { errorText } from '@/api/client';
import { keys, useUnitAreas } from '@/api/queries';
import { MAX_PHOTOS, type Media } from '@/features/media/media';
import { MediaViewer } from '@/features/media/MediaViewer';
import { useMediaPicker } from '@/features/media/useMediaPicker';
import { useQuickDraft } from '@/features/quick/draft';
import { requestForm } from '@/features/requests/form';
import { loc } from '@/features/requests/labels';
import { goHome } from '@/lib/nav';
import { useActiveUnit, useActiveUnitStore } from '@/store/activeUnit';
import { currentLanguage } from '@/store/prefs';
import { BottomSheet, Chip, Header, Screen, useTheme } from '@/ui';
import { needsNetwork } from '@/features/offline/guard';

// Reporte rápido (prototipo: isQuick). Primero solo la toma; el área y la
// nota aparecen cuando ya hay foto o video. El equipo clasifica área, equipo
// y problema desde el portal.
export default function QuickReport() {
  const { t } = useTranslation();
  const router = useRouter();
  const qc = useQueryClient();
  const { palette } = useTheme();
  const lang = currentLanguage();
  const { unit, units } = useActiveUnit();
  const setUnit = useActiveUnitStore((s) => s.setUnit);
  const areas = useUnitAreas(unit?.unitId);
  const { draft, save, clear } = useQuickDraft();

  // Se retoma el borrador si lo hay (el Inicio lo ofrece).
  const [media, setMedia] = useState<Media[]>(() => draft?.media ?? []);
  const [areaId, setAreaId] = useState<number | null>(() => draft?.areaId ?? null);
  const [note, setNote] = useState(() => draft?.note ?? '');
  const [error, setError] = useState<string>();
  const [sending, setSending] = useState(false);
  const [unitSheet, setUnitSheet] = useState(false);
  const [viewer, setViewer] = useState<number | null>(null);

  const photos = media.filter((m) => m.kind === 'photo');
  const video = media.find((m) => m.kind === 'video');
  const ready = media.length > 0;

  const replacing = useRef<number | null>(null);
  const picker = useMediaPicker((m) => {
    setError(undefined);
    const at = replacing.current;
    replacing.current = null;
    setMedia((prev) => {
      if (at !== null) return prev.map((x, i) => (i === at ? m : x));
      return m.kind === 'video' ? [...prev.filter((x) => x.kind !== 'video'), m] : [...prev, m];
    });
  });
  const add = (kind: 'photo' | 'video') => {
    replacing.current = null;
    picker.open(kind);
  };

  // Salir a medias deja el borrador en el Inicio.
  const leave = () => {
    save({ media, areaId, note });
    goHome(router);
  };
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      leave();
      return true;
    });
    return () => sub.remove();
  });

  const send = async () => {
    if (!unit) return;
    if (!ready) return setError(t('report.quickErr'));
    setError(undefined);
    setSending(true);
    try {
      const form = requestForm(
        { unitId: unit.unitId, areaId: areaId || undefined, description: note.trim() },
        media,
      );
      const { data } = await appApi.createQuick(form);
      clear();
      void qc.invalidateQueries({ queryKey: keys.requests });
      router.replace({
        pathname: '/reports/sent',
        params: { kind: 'quick', folio: data.folio, id: String(data.id) },
      });
    } catch (e) {
      setError(errorText(e, lang));
    } finally {
      setSending(false);
    }
  };

  return (
    <Screen header={<Header title={t('report.quickTitle')} back={leave} />}>
      {unit ? (
        <Pressable
          onPress={units.length > 1 ? () => setUnitSheet(true) : undefined}
          disabled={units.length < 2}
          accessibilityRole={units.length > 1 ? 'button' : undefined}
          className="min-h-14 flex-row items-center gap-3 rounded-md border border-border bg-surface-1 px-3.5 py-3"
        >
          <Building2 size={18} color={palette.brandSoft} strokeWidth={2} />
          <View className="min-w-0 flex-1">
            <Text className="text-label font-medium text-text-mute">{t('report.reportingIn')}</Text>
            <Text className="text-body text-text">{unit.label}</Text>
          </View>
          {units.length > 1 ? (
            <Text className="text-caption font-semibold text-brand-soft">{t('home.change')}</Text>
          ) : null}
        </Pressable>
      ) : null}

      <View className="gap-2.5">
        {!ready ? (
          <Pressable
            onPress={() => add('photo')}
            accessibilityRole="button"
            accessibilityLabel={`${t('report.shotEmpty')}. ${t('report.shotHint')}`}
            className="min-h-[9.375rem] items-center justify-center gap-2 rounded-md border-[1.5px] border-dashed border-border bg-surface-1 p-5"
          >
            <Camera size={30} color={palette.brandSoft} strokeWidth={2} />
            <Text className="text-center text-body font-semibold text-text">{t('report.shotEmpty')}</Text>
            <Text className="text-center text-caption text-text-mute">{t('report.shotHint')}</Text>
          </Pressable>
        ) : (
          <>
            <View className="flex-row flex-wrap gap-2.5">
              {media.map((m, i) => (
                <Thumb
                  key={m.uri}
                  media={m}
                  onPress={() => setViewer(i)}
                  onRemove={() => setMedia((prev) => prev.filter((_, j) => j !== i))}
                />
              ))}
              {photos.length < MAX_PHOTOS ? (
                <Pressable
                  onPress={() => add('photo')}
                  accessibilityRole="button"
                  className="aspect-square w-[31%] items-center justify-center gap-1.5 rounded-md border-[1.5px] border-dashed border-border bg-surface-1"
                >
                  <Plus size={22} color={palette.brandSoft} strokeWidth={2} />
                  <Text className="text-center text-tab text-text-soft">
                    {t('report.addMore')} {photos.length}/{MAX_PHOTOS}
                  </Text>
                </Pressable>
              ) : null}
            </View>
            {!video ? (
              <Pressable
                onPress={() => add('video')}
                accessibilityRole="button"
                className="min-h-11 flex-row items-center gap-2 self-start rounded-pill border border-border bg-surface-1 px-3.5"
              >
                <Video size={16} color={palette.text} strokeWidth={2} />
                <Text className="text-[0.875rem] font-semibold text-text">{t('report.addVideo')}</Text>
              </Pressable>
            ) : null}
          </>
        )}
      </View>

      {ready ? (
        <>
          <View className="gap-2.5">
            <SectionTitle title={t('report.where')} optional={t('report.optional')} />
            <View className="flex-row flex-wrap gap-2" accessibilityRole="radiogroup">
              {(areas.data ?? []).map((a) => (
                <Chip
                  key={a.id}
                  label={loc(a.name, lang)}
                  selected={areaId === a.areaId}
                  onPress={() => setAreaId(a.areaId)}
                />
              ))}
              <Chip label={t('report.unsure')} selected={areaId === 0} onPress={() => setAreaId(0)} />
            </View>
          </View>

          <View className="gap-2.5">
            <SectionTitle title={t('report.noteLabel')} optional={t('report.optional')} />
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder={t('report.notePh')}
              placeholderTextColor={palette.textMute}
              selectionColor={palette.brand}
              multiline
              maxLength={1500}
              accessibilityLabel={t('report.noteLabel')}
              className="min-h-[7rem] rounded-sm border border-border bg-surface-2 p-3.5 text-body text-text"
              style={{ textAlignVertical: 'top' }}
            />
          </View>

          <View className="flex-row gap-2.5 rounded-md border border-border bg-surface-1 px-4 py-3.5">
            <Info size={18} color={palette.info} strokeWidth={2} style={{ marginTop: 2 }} />
            <Text className="flex-1 text-caption text-text-soft">{t('report.quickNote')}</Text>
          </View>
        </>
      ) : null}

      {error ? (
        <View className="flex-row items-center gap-2" accessibilityRole="alert">
          <AlertCircle size={16} color={palette.danger} strokeWidth={2} />
          <Text className="flex-1 text-caption text-danger">{error}</Text>
        </View>
      ) : null}

      {/* Enviar: gris hasta que hay foto o video, dorado después. */}
      <Pressable
        onPress={needsNetwork(send)}
        disabled={sending}
        accessibilityRole="button"
        accessibilityState={{ busy: sending }}
        className={`min-h-13 items-center justify-center rounded-md ${ready ? 'bg-brand' : 'border border-border bg-surface-2'} active:opacity-80`}
      >
        <Text className={`text-[1rem] font-semibold ${ready ? 'text-ink' : 'text-text-mute'}`}>
          {sending ? '…' : t('report.send')}
        </Text>
      </Pressable>

      {picker.sheets}
      <MediaViewer
        items={media.map((m) => ({ kind: m.kind, uri: m.uri }))}
        index={viewer}
        onIndex={setViewer}
        onClose={() => setViewer(null)}
        caption={t('media.pending')}
        actions={[
          {
            label: t('media.replace'),
            icon: RefreshCw,
            onPress: (i) => {
              setViewer(null);
              replacing.current = i;
              picker.open(media[i]?.kind ?? 'photo');
            },
          },
          {
            label: t('media.remove'),
            icon: Trash2,
            danger: true,
            onPress: (i) => {
              setViewer(null);
              setMedia((prev) => prev.filter((_, j) => j !== i));
            },
          },
        ]}
      />
      <BottomSheet
        visible={unitSheet}
        onClose={() => setUnitSheet(false)}
        title={t('home.chooseUnit')}
        options={units.map((u) => ({
          label: u.label,
          tone: u.unitId === unit?.unitId ? 'primary' : 'neutral',
          onPress: () => {
            setUnit(u.unitId);
            setAreaId(null);
            setUnitSheet(false);
          },
        }))}
      />
    </Screen>
  );
}

function SectionTitle({ title, optional }: { title: string; optional: string }) {
  return (
    <View className="flex-row flex-wrap items-baseline gap-2">
      <Text className="text-body-lg font-semibold text-text">{title}</Text>
      <Text className="text-label font-medium text-text-mute">{optional}</Text>
    </View>
  );
}

// Miniatura cuadrada (3 por fila) con quitar arriba a la derecha y, si es
// video, el indicador de play.
function Thumb({ media, onPress, onRemove }: { media: Media; onPress: () => void; onRemove: () => void }) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={media.kind === 'video' ? t('media.video') : t('media.photo', { n: '' })}
      className="aspect-square w-[31%] overflow-hidden rounded-md border border-border bg-surface-1"
    >
      {media.kind === 'photo' ? (
        <Image source={{ uri: media.uri }} style={{ flex: 1 }} contentFit="cover" />
      ) : (
        <View className="flex-1 items-center justify-center bg-surface-2">
          <CheckCircle2 size={24} color={palette.success} strokeWidth={2} />
        </View>
      )}
      {media.kind === 'video' ? (
        <View className="absolute left-1.5 top-1.5 h-[1.375rem] w-[1.375rem] items-center justify-center rounded-pill bg-ink/[0.72]">
          <Play size={12} color={palette.brandSoft} fill={palette.brandSoft} />
        </View>
      ) : null}
      <Pressable
        onPress={onRemove}
        accessibilityRole="button"
        accessibilityLabel={t('report.remove')}
        hitSlop={8}
        className="absolute right-1 top-1 h-[1.625rem] w-[1.625rem] items-center justify-center rounded-pill border border-border bg-[rgba(24,25,26,0.82)]"
      >
        <X size={14} color={palette.danger} strokeWidth={2.5} />
      </Pressable>
    </Pressable>
  );
}
