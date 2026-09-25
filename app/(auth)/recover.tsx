import { useRouter } from 'expo-router';
import { Mail } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { authApi } from '@/api/auth';
import { errorText } from '@/api/client';
import { AuthScreen } from '@/features/auth/AuthScreen';
import { useAuthFlow } from '@/features/auth/flow';
import { validEmail } from '@/features/auth/password';
import { currentLanguage } from '@/store/prefs';
import { Button, ErrorMessage, Field, Header } from '@/ui';

export default function Recover() {
  const { t } = useTranslation();
  const router = useRouter();
  const flow = useAuthFlow();
  const [email, setEmail] = useState(flow.email);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!validEmail(email)) return setError(t('auth.errEmail'));
    setError(undefined);
    setLoading(true);
    try {
      // El servidor responde igual exista o no el correo.
      await authApi.requestRecovery(email.trim());
      flow.set({ email: email.trim(), code: '' });
      router.push('/verify');
    } catch (e) {
      setError(errorText(e, currentLanguage()));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreen header={<Header title="" back />} title={t('auth.recover')} description={t('auth.recoverDesc')}>
      <View className="gap-4">
        <Field
          label={t('auth.email')}
          icon={Mail}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          returnKeyType="send"
          onSubmitEditing={submit}
        />
        {error ? <ErrorMessage message={error} /> : null}
      </View>
      <Button label={t('auth.requestCode')} onPress={submit} loading={loading} fullWidth />
    </AuthScreen>
  );
}
