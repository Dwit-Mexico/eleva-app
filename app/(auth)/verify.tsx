import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { authApi } from '@/api/auth';
import { errorText } from '@/api/client';
import { AuthScreen, TextLink } from '@/features/auth/AuthScreen';
import { CodeInput } from '@/features/auth/CodeInput';
import { useAuthFlow } from '@/features/auth/flow';
import { currentLanguage } from '@/store/prefs';
import { Button, ErrorMessage } from '@/ui';

const RESEND_AFTER = 60; // segundos

export default function Verify() {
  const { t } = useTranslation();
  const router = useRouter();
  const flow = useAuthFlow();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string>();
  const [notice, setNotice] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [wait, setWait] = useState(RESEND_AFTER);

  useEffect(() => {
    if (wait <= 0) return undefined;
    const id = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(id);
  }, [wait]);

  const submit = async () => {
    if (code.length !== 6) return setError(t('auth.errCode'));
    setError(undefined);
    setLoading(true);
    try {
      await authApi.verifyRecovery(flow.email, code);
      flow.set({ code });
      router.push('/reset');
    } catch (e) {
      setError(errorText(e, currentLanguage()));
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    setError(undefined);
    try {
      await authApi.requestRecovery(flow.email);
      setNotice(t('auth.codeSent'));
      setCode('');
      setWait(RESEND_AFTER);
    } catch (e) {
      setError(errorText(e, currentLanguage()));
    }
  };

  const mmss = `00:${String(wait).padStart(2, '0')}`;
  return (
    <AuthScreen title={t('auth.verifyTitle')} back description={t('auth.verifyDesc', { email: flow.email })}>
      <View className="gap-3">
        <CodeInput value={code} onChange={setCode} error={!!error} />
        {error ? <ErrorMessage message={error} /> : null}
        {notice && !error ? <Text className="text-caption text-success">{notice}</Text> : null}
      </View>
      <Button label={t('auth.verify')} onPress={submit} loading={loading} disabled={code.length !== 6} fullWidth />
      <View className="-mt-3">
        <TextLink
          label={wait > 0 ? t('auth.resendIn', { time: mmss }) : t('auth.resend')}
          onPress={resend}
          disabled={wait > 0}
        />
      </View>
    </AuthScreen>
  );
}
