import { useLocalSearchParams, useRouter } from 'expo-router';
import { Check, Info } from 'lucide-react-native';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, Pressable, Text, View } from 'react-native';

import { goHome } from '@/lib/nav';
import { Header, Screen, useTheme } from '@/ui';

// Confirmación (prototipo: quickSent e isDoneStep).
export default function Sent() {
  const { t } = useTranslation();
  const router = useRouter();
  const { palette } = useTheme();
  const { kind, folio, id } = useLocalSearchParams<{ kind: 'quick' | 'guided'; folio: string; id?: string }>();
  const quick = kind === 'quick';

  // Atrás no regresa al formulario ya enviado.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      goHome(router);
      return true;
    });
    return () => sub.remove();
  }, [router]);

  const circle = (
    <View className="h-[4.5rem] w-[4.5rem] items-center justify-center self-center rounded-pill bg-success-tint">
      <Check size={34} color={palette.success} strokeWidth={2.5} />
    </View>
  );

  if (quick) {
    return (
      <Screen header={<Header title="" back={() => goHome(router)} />}>
        {circle}
        <Text className="text-center text-title font-semibold text-text" accessibilityRole="header">
          {t('report.sentQuickTitle')}
        </Text>
        <Text className="text-center text-body text-text-soft">{t('report.sentQuickBody')}</Text>
        <View className="flex-row items-center gap-3 rounded-md border border-border bg-surface-1 p-4">
          <Text className="font-mono text-caption text-brand-soft" selectable>
            {folio}
          </Text>
          <Text className="ml-auto text-caption text-text-mute">{t('report.folioNote')}</Text>
        </View>
        <View className="flex-row gap-2.5">
          <Choice label={t('report.anotherNo')} onPress={() => goHome(router)} />
          <Choice
            label={t('report.openReport')}
            primary
            onPress={() => (id ? router.replace(`/reports/${id}`) : goHome(router))}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen header={<Header title={t('report.sentTitle')} />}>
      {circle}
      <Text className="text-center text-title font-semibold text-text" accessibilityRole="header">
        {t('report.sentTitle')}
      </Text>
      <View className="gap-2.5 rounded-md border border-border bg-surface-1 p-4">
        <Text className="font-mono text-folio tracking-[0.24px] text-text-mute" selectable>
          {folio}
        </Text>
        <Text className="text-body text-text-soft">{t('report.terms1')}</Text>
      </View>
      <View className="flex-row gap-2.5 rounded-md border border-border bg-surface-1 px-4 py-3.5">
        <Info size={18} color={palette.info} strokeWidth={2} style={{ marginTop: 2 }} />
        <Text className="flex-1 text-caption text-text-soft">
          <Text className="font-semibold text-text">{t('report.note')}</Text> {t('report.terms2')}
        </Text>
      </View>
      <Text className="mt-1 text-center text-body text-text">{t('report.another')}</Text>
      <View className="flex-row gap-2.5">
        <Choice label={t('report.anotherYes')} onPress={() => router.replace('/reports/wizard')} />
        <Choice label={t('report.anotherNo')} primary onPress={() => goHome(router)} />
      </View>
    </Screen>
  );
}

function Choice({ label, onPress, primary }: { label: string; onPress: () => void; primary?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className={`min-h-13 flex-1 items-center justify-center rounded-md px-3 ${primary ? 'bg-brand' : 'border border-border'} active:opacity-80`}
    >
      <Text className={`text-center text-[1rem] font-semibold ${primary ? 'text-ink' : 'text-text'}`}>{label}</Text>
    </Pressable>
  );
}
