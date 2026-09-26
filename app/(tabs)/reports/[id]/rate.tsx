import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  Star,
  ThumbsDown,
  ThumbsUp,
  type LucideIcon,
} from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, TextInput, View } from 'react-native';

import { appApi } from '@/api/app';
import { errorText } from '@/api/client';
import { keys } from '@/api/queries';
import { currentLanguage } from '@/store/prefs';
import { Header, Screen, useTheme } from '@/ui';
import { needsNetwork } from '@/features/offline/guard';

// Calificar la reparación (prototipo: isRate). Primero "¿quedó satisfecho?";
// después estrellas (vacías por defecto) y comentario. "No" reabre el reporte.
export default function Rate() {
  const { t } = useTranslation();
  const router = useRouter();
  const qc = useQueryClient();
  const { palette } = useTheme();
  const lang = currentLanguage();
  const { id } = useLocalSearchParams<{ id: string }>();
  const rid = Number(id);
  const [ok, setOk] = useState<boolean | null>(null);
  const [stars, setStars] = useState(0);
  const [text, setText] = useState('');
  const [error, setError] = useState<string>();
  const [sending, setSending] = useState(false);
  const labels = t('detail.stars', { returnObjects: true }) as string[];
  const ready = ok !== null && stars > 0;

  const submit = async () => {
    if (ok === null) return setError(t('rate.answerFirst'));
    if (!stars) return setError(t('rate.pickStars'));
    setError(undefined);
    setSending(true);
    try {
      await appApi.rate(rid, { repaired: ok, score: stars, comment: text.trim() || undefined });
      await Promise.all([
        qc.invalidateQueries({ queryKey: keys.requests }),
        qc.invalidateQueries({ queryKey: keys.request(rid) }),
      ]);
      if (ok) router.dismissTo({ pathname: '/reports', params: { tab: 'history' } });
      else router.back(); // el detalle ya muestra la nueva visita por agendar
    } catch (e) {
      setError(errorText(e, lang));
    } finally {
      setSending(false);
    }
  };

  return (
    <Screen header={<Header title={t('rate.title')} back />}>
      <View className="gap-2.5">
        <Text className="text-body-lg font-semibold text-text">{t('rate.question')}</Text>
        <View className="flex-row gap-2.5" accessibilityRole="radiogroup">
          <Answer
            icon={ThumbsUp}
            label={t('rate.yes')}
            on={ok === true}
            tone="success"
            onPress={() => (setOk(true), setError(undefined))}
          />
          <Answer
            icon={ThumbsDown}
            label={t('rate.no')}
            on={ok === false}
            tone="danger"
            onPress={() => (setOk(false), setError(undefined))}
          />
        </View>
        {ok !== null ? (
          <View
            className={`flex-row gap-2.5 rounded-sm border bg-surface-1 px-3.5 py-3 ${ok ? 'border-border' : 'border-warning'}`}
          >
            {ok ? (
              <CheckCircle2 size={18} color={palette.success} strokeWidth={2} style={{ marginTop: 2 }} />
            ) : (
              <CalendarClock size={18} color={palette.warning} strokeWidth={2} style={{ marginTop: 2 }} />
            )}
            <Text className="flex-1 text-caption text-text-soft">
              {ok ? t('rate.yesConseq') : t('rate.noConseq')}
            </Text>
          </View>
        ) : null}
      </View>

      {ok !== null ? (
        <>
          <View className="items-center gap-2.5 rounded-md border border-border bg-surface-1 p-4">
            <Text className="text-center text-body font-semibold leading-[1.375rem] text-text">
              {t('rate.service')}
            </Text>
            <View className="flex-row gap-0.5" accessibilityRole="radiogroup">
              {[1, 2, 3, 4, 5].map((n) => (
                <Pressable
                  key={n}
                  onPress={() => {
                    setStars(n);
                    setError(undefined);
                  }}
                  accessibilityRole="radio"
                  accessibilityLabel={t('rate.star', { n })}
                  accessibilityState={{ selected: stars === n }}
                  className="h-12 w-12 items-center justify-center"
                >
                  <Star
                    size={30}
                    color={n <= stars ? palette.brandSoft : palette.border}
                    fill={n <= stars ? palette.brandSoft : 'transparent'}
                    strokeWidth={2}
                  />
                </Pressable>
              ))}
            </View>
            <Text
              className={`text-center text-body leading-[1.375rem] ${stars ? 'font-semibold text-brand-soft' : 'text-text-mute'}`}
            >
              {stars ? labels[stars - 1] : t('rate.tapStars')}
            </Text>
          </View>

          <View className="gap-2">
            <View className="flex-row flex-wrap items-baseline gap-2">
              <Text className="text-body leading-[1.375rem] text-text">
                {ok ? t('rate.yesNote') : t('rate.noNote')}
              </Text>
              <Text className="text-label font-medium text-text-mute">
                {ok ? t('report.optional') : t('rate.noHint')}
              </Text>
            </View>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder={ok ? t('rate.yesPh') : t('rate.noPh')}
              placeholderTextColor={palette.textMute}
              selectionColor={palette.brand}
              multiline
              maxLength={500}
              accessibilityLabel={ok ? t('rate.yesNote') : t('rate.noNote')}
              className="min-h-[7rem] rounded-sm border border-border bg-surface-2 p-3.5 text-body leading-[1.375rem] text-text"
              style={{ textAlignVertical: 'top' }}
            />
          </View>
        </>
      ) : null}

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
        className={`min-h-13 items-center justify-center rounded-md ${ready ? 'bg-brand' : 'border border-border bg-surface-2'} active:opacity-80`}
      >
        <Text className={`text-[1rem] font-semibold ${ready ? 'text-ink' : 'text-text-mute'}`}>
          {sending ? '…' : t('rate.send')}
        </Text>
      </Pressable>
      <Text className="-mt-2 text-center text-label text-text-mute">{t('rate.once')}</Text>
    </Screen>
  );
}

// Sí (success) / No (danger): relleno del color al elegirse, contorno si no.
function Answer({
  icon: Icon,
  label,
  on,
  tone,
  onPress,
}: {
  icon: LucideIcon;
  label: string;
  on: boolean;
  tone: 'success' | 'danger';
  onPress: () => void;
}) {
  const { palette } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected: on }}
      className={`min-h-13 flex-1 flex-row items-center justify-center gap-2 rounded-md ${on ? (tone === 'success' ? 'bg-success' : 'bg-danger') : 'border border-border bg-surface-1'}`}
    >
      <Icon size={18} color={on ? palette.ink : palette.text} strokeWidth={2} />
      <Text className={`text-[1rem] font-semibold ${on ? 'text-ink' : 'text-text'}`}>{label}</Text>
    </Pressable>
  );
}
