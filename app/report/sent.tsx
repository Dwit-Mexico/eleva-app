import { useLocalSearchParams, useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, Text, View } from 'react-native';

import { Button, Screen, useTheme } from '@/ui';

// Confirmación: el reporte rápido destaca el folio ("Guarda este número"); el
// guiado muestra además el texto de 72 horas y ofrece reportar otro.
export default function Sent() {
  const { t } = useTranslation();
  const router = useRouter();
  const { palette } = useTheme();
  const { kind, folio } = useLocalSearchParams<{ kind: 'quick' | 'guided'; folio: string }>();
  const quick = kind === 'quick';
  const home = () => router.dismissTo('/');

  // Atrás no regresa al formulario ya enviado.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      router.dismissTo('/');
      return true;
    });
    return () => sub.remove();
  }, [router]);

  return (
    <Screen
      footer={
        quick ? (
          <Button label={t('report.anotherNo')} onPress={home} fullWidth />
        ) : (
          <View className="gap-3">
            <Text className="text-center text-body font-semibold text-text">{t('report.another')}</Text>
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Button
                  label={t('report.anotherYes')}
                  variant="secondary"
                  onPress={() => router.replace('/report/wizard')}
                  fullWidth
                />
              </View>
              <View className="flex-1">
                <Button label={t('report.anotherNo')} onPress={home} fullWidth />
              </View>
            </View>
          </View>
        )
      }
    >
      <View className="flex-1 items-center justify-center gap-5 py-8">
        <View className="h-20 w-20 items-center justify-center rounded-pill bg-success">
          <Check size={40} color={palette.ink} strokeWidth={3} />
        </View>
        <Text className="text-center text-display font-semibold text-text" accessibilityRole="header">
          {quick ? t('report.sentQuickTitle') : t('report.sentTitle')}
        </Text>
        <View className="items-center gap-1 rounded-md border border-border bg-surface-1 px-6 py-4">
          <Text className="font-mono text-[28px] font-semibold text-brand-soft" selectable>
            {folio}
          </Text>
          <Text className="text-caption text-text-soft">{t('report.folioNote')}</Text>
        </View>
        {quick ? (
          <Text className="text-center text-body text-text-soft">{t('report.sentQuickBody')}</Text>
        ) : (
          <View className="gap-3">
            <Text className="text-center text-body text-text-soft">{t('report.terms1')}</Text>
            <Text className="text-center text-body text-text">
              <Text className="font-semibold text-warning">{t('report.note')} </Text>
              {t('report.terms2')}
            </Text>
          </View>
        )}
      </View>
    </Screen>
  );
}
