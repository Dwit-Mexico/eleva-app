import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AlertCircle, CalendarCheck, CheckCircle2, Circle, Info } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, TextInput, View } from 'react-native';

import { appApi } from '@/api/app';
import { errorText } from '@/api/client';
import { keys, useRequest } from '@/api/queries';
import { ContactButtons } from '@/features/requests/ContactButtons';
import { goHome } from '@/lib/nav';
import { formatDay, formatTime } from '@/lib/relativeTime';
import { currentLanguage } from '@/store/prefs';
import { Header, Screen, useTheme } from '@/ui';
import { needsNetwork } from '@/features/offline/guard';

// Agendar la visita (prototipo: isAgendar): una de las fechas que propuso el
// equipo, nota opcional para el técnico y confirmación.
export default function Schedule() {
  const { t } = useTranslation();
  const router = useRouter();
  const qc = useQueryClient();
  const { palette } = useTheme();
  const lang = currentLanguage();
  const { id } = useLocalSearchParams<{ id: string }>();
  const rid = Number(id);
  const r = useRequest(rid).data;
  const [picked, setPicked] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [error, setError] = useState<string>();
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Date | null>(null);

  const submit = async () => {
    if (!picked) return setError(t('schedule.pick'));
    setError(undefined);
    setSending(true);
    try {
      await appApi.schedule(rid, { date: picked, notes: note.trim() || undefined });
      void qc.invalidateQueries({ queryKey: keys.requests });
      void qc.invalidateQueries({ queryKey: keys.request(rid) });
      setDone(new Date(picked));
    } catch (e) {
      setError(errorText(e, lang));
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <Screen header={<Header title="" back />}>
        <View className="h-[4.5rem] w-[4.5rem] items-center justify-center self-center rounded-pill bg-success-tint">
          <CalendarCheck size={34} color={palette.success} strokeWidth={2} />
        </View>
        <Text className="-mt-1 text-center text-title font-semibold text-text">{t('schedule.okTitle')}</Text>
        <View className="rounded-md border border-success bg-surface-1 p-4">
          <Text className="text-center text-body-lg font-semibold text-text">
            {formatDay(done, lang)} · {formatTime(done, lang)}
          </Text>
          <Text className="mt-1 text-center text-caption text-text-soft">{t('schedule.okBody')}</Text>
        </View>
        <Pressable
          onPress={() => goHome(router)}
          accessibilityRole="button"
          className="min-h-13 items-center justify-center rounded-md bg-brand active:opacity-80"
        >
          <Text className="text-[1rem] font-semibold text-ink">{t('schedule.done')}</Text>
        </Pressable>
      </Screen>
    );
  }

  return (
    <Screen header={<Header title={t('schedule.title')} back />}>
      <Text className="text-body leading-[1.375rem] text-text-soft">{t('schedule.intro')}</Text>

      <View className="gap-2.5" accessibilityRole="radiogroup">
        {(r?.proposedDates ?? []).map((iso) => {
          const d = new Date(iso);
          const on = picked === iso;
          const Icon = on ? CheckCircle2 : Circle;
          return (
            <Pressable
              key={iso}
              onPress={() => {
                setPicked(iso);
                setError(undefined);
              }}
              accessibilityRole="radio"
              accessibilityState={{ selected: on }}
              className={`min-h-[4.5rem] flex-row items-center gap-3.5 rounded-md border bg-surface-1 p-4 ${on ? 'border-brand' : 'border-border'}`}
            >
              <Icon size={20} color={on ? palette.brand : palette.border} strokeWidth={2} />
              <View className="min-w-0 flex-1">
                <Text className="text-body-lg font-semibold text-text">{formatDay(d, lang)}</Text>
                <Text className="text-body leading-[1.375rem] text-text-soft">
                  {t('schedule.fromTime', { time: formatTime(d, lang) })}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <View className="flex-row gap-2.5 rounded-md border border-border bg-surface-1 px-4 py-3.5">
        <Info size={18} color={palette.info} strokeWidth={2} style={{ marginTop: 2 }} />
        <Text className="flex-1 text-caption text-text-soft">
          <Text className="font-semibold text-text">{t('schedule.note')}</Text> {t('schedule.terms')}
        </Text>
      </View>

      <View className="gap-2">
        <View className="flex-row flex-wrap items-baseline gap-2">
          <Text className="text-body leading-[1.375rem] text-text">{t('schedule.noteLabel')}</Text>
          <Text className="text-label font-medium text-text-mute">{t('report.optional')}</Text>
        </View>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder={t('schedule.notePh')}
          placeholderTextColor={palette.textMute}
          selectionColor={palette.brand}
          multiline
          maxLength={200}
          accessibilityLabel={t('schedule.noteLabel')}
          className="min-h-[5.5rem] rounded-sm border border-border bg-surface-2 p-3.5 text-body leading-[1.375rem] text-text"
          style={{ textAlignVertical: 'top' }}
        />
      </View>

      {error ? (
        <View className="flex-row items-center gap-2" accessibilityRole="alert">
          <AlertCircle size={16} color={palette.danger} strokeWidth={2} />
          <Text className="flex-1 text-caption text-danger">{error}</Text>
        </View>
      ) : null}

      <Pressable
        onPress={needsNetwork(submit)}
        disabled={sending}
        accessibilityRole="button"
        accessibilityState={{ busy: sending }}
        className={`min-h-13 items-center justify-center rounded-md ${picked ? 'bg-brand' : 'border border-border bg-surface-2'} active:opacity-80`}
      >
        <Text className={`text-[1rem] font-semibold ${picked ? 'text-ink' : 'text-text-mute'}`}>
          {sending ? '…' : t('schedule.cta')}
        </Text>
      </Pressable>

      <ContactButtons folio={r?.folio} />
      <Text className="text-center text-label text-text-mute">{t('schedule.none')}</Text>
    </Screen>
  );
}
