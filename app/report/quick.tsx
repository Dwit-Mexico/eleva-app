import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Camera, CheckCircle2, Info, Plus, Video } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { appApi } from '@/api/app';
import { errorText } from '@/api/client';
import { keys, useUnitAreas } from '@/api/queries';
import { MAX_PHOTOS, type Media } from '@/features/media/media';
import { useMediaPicker } from '@/features/media/useMediaPicker';
import { requestForm } from '@/features/requests/form';
import { loc } from '@/features/requests/labels';
import { useActiveUnit } from '@/store/activeUnit';
import { currentLanguage } from '@/store/prefs';
import { BottomSheet, Button, Chip, ErrorMessage, Field, Header, MediaSlot, Screen, useTheme } from '@/ui';

// Reporte rápido: para quien no sabe clasificar el problema. Lo único
// obligatorio es una foto o un video; el equipo clasifica área, equipo y
// problema desde el portal.
export default function QuickReport() {
  const { t } = useTranslation();
  const router = useRouter();
  const qc = useQueryClient();
  const { palette } = useTheme();
  const lang = currentLanguage();
  const { unit, units } = useActiveUnit();
  const areas = useUnitAreas(unit?.unitId);

  const [media, setMedia] = useState<Media[]>([]);
  const [areaId, setAreaId] = useState<number | null>(null); // null = no estoy seguro
  const [note, setNote] = useState('');
  const [error, setError] = useState<string>();
  const [sending, setSending] = useState(false);
  const [selected, setSelected] = useState<number | null>(null); // índice abierto en la hoja

  const photos = media.filter((m) => m.kind === 'photo');
  const video = media.find((m) => m.kind === 'video');
  // Al reemplazar se guarda el índice y el archivo nuevo entra en su lugar solo
  // si el usuario elige uno (cancelar no borra nada).
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

  // Agregar (no reemplazar): se descarta un reemplazo que se canceló antes.
  const add = (kind: 'photo' | 'video') => {
    replacing.current = null;
    picker.open(kind);
  };

  const send = async () => {
    if (!unit) return;
    if (media.length === 0) return setError(t('report.quickErr'));
    setError(undefined);
    setSending(true);
    try {
      const form = requestForm({ unitId: unit.unitId, areaId: areaId ?? undefined, description: note.trim() }, media);
      const { data } = await appApi.createQuick(form);
      void qc.invalidateQueries({ queryKey: keys.requests });
      router.replace({ pathname: '/report/sent', params: { kind: 'quick', folio: data.folio } });
    } catch (e) {
      setError(errorText(e, lang));
    } finally {
      setSending(false);
    }
  };

  const first = media[0];
  return (
    <Screen
      header={<Header title={t('report.quickTitle')} back />}
      footer={
        <View className="gap-3">
          {error ? <ErrorMessage message={error} /> : null}
          <Button label={t('report.send')} onPress={send} loading={sending} fullWidth />
        </View>
      }
    >
      {units.length > 1 && unit ? (
        <Text className="text-caption text-text-soft">
          {t('report.reportingIn')} <Text className="font-semibold text-brand-soft">{unit.label}</Text>
        </Text>
      ) : null}

      <Text className="text-title font-semibold text-text" accessibilityRole="header">
        {t('report.step1')}
      </Text>

      {/* Toma principal: lo único obligatorio. */}
      <Pressable
        onPress={() => (first ? setSelected(0) : add('photo'))}
        accessibilityRole="button"
        accessibilityLabel={first ? t('report.shotDone') : t('report.shotEmpty')}
        className={`min-h-[140px] items-center justify-center gap-2 rounded-md px-4 py-6 ${first ? 'border border-solid border-success bg-success-tint' : 'border-[1.5px] border-dashed border-brand bg-brand-tint'}`}
      >
        {first ? (
          <CheckCircle2 size={32} color={palette.success} strokeWidth={2} />
        ) : (
          <Camera size={32} color={palette.brandSoft} strokeWidth={2} />
        )}
        <Text className="text-body-lg font-semibold text-text">{first ? t('report.shotDone') : t('report.shotEmpty')}</Text>
        <Text className="text-caption text-text-soft">{first ? t('report.shotDoneHint') : t('report.shotHint')}</Text>
      </Pressable>

      {media.length > 0 ? (
        <View className="flex-row gap-3">
          {media.map((m, i) => (
            <MediaSlot
              key={m.uri}
              kind={m.kind}
              index={i + 1}
              uri={m.uri}
              onPress={() => setSelected(i)}
            />
          ))}
          {Array.from({ length: Math.max(0, 4 - media.length) }, (_, i) => (
            <View key={`gap-${i}`} className="flex-1" />
          ))}
        </View>
      ) : null}

      {media.length > 0 ? (
        <View className="flex-row flex-wrap gap-2">
          {photos.length < MAX_PHOTOS ? (
            <Button label={t('report.addMore')} icon={Plus} variant="secondary" size="md" onPress={() => add('photo')} />
          ) : null}
          {!video ? (
            <Button label={t('report.addVideo')} icon={Video} variant="secondary" size="md" onPress={() => add('video')} />
          ) : null}
        </View>
      ) : null}

      <View className="gap-3 pt-2">
        <Text className="text-body font-semibold text-text">
          {t('report.where')} <Text className="font-normal text-text-mute">· {t('report.optional')}</Text>
        </Text>
        <View className="flex-row flex-wrap gap-2" accessibilityRole="radiogroup">
          {(areas.data ?? []).map((a) => (
            <Chip
              key={a.id}
              label={loc(a.name, lang)}
              selected={areaId === a.areaId}
              onPress={() => setAreaId(areaId === a.areaId ? null : a.areaId)}
            />
          ))}
          <Chip label={t('report.unsure')} selected={areaId === null} onPress={() => setAreaId(null)} />
        </View>
      </View>

      <Field
        label={`${t('report.noteLabel')} · ${t('report.optional')}`}
        value={note}
        onChangeText={setNote}
        placeholder={t('report.notePh')}
        multiline
        maxLength={1500}
      />

      <View className="flex-row gap-2.5 rounded-md bg-info-tint px-4 py-3">
        <Info size={18} color={palette.info} strokeWidth={2} />
        <Text className="flex-1 text-caption text-text">{t('report.quickNote')}</Text>
      </View>

      {picker.sheets}
      <BottomSheet
        visible={selected !== null}
        onClose={() => setSelected(null)}
        title={t('report.evidence')}
        options={[
          {
            label: t('report.replace'),
            onPress: () => {
              const m = selected !== null ? media[selected] : undefined;
              replacing.current = selected;
              setSelected(null);
              if (m) picker.open(m.kind);
            },
          },
          {
            label: t('report.remove'),
            tone: 'danger',
            onPress: () => {
              setMedia((prev) => prev.filter((_, i) => i !== selected));
              setSelected(null);
            },
          },
        ]}
      />
    </Screen>
  );
}
