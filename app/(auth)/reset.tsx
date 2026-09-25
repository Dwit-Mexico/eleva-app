import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { authApi } from '@/api/auth';
import { errorText } from '@/api/client';
import { AuthScreen } from '@/features/auth/AuthScreen';
import { useAuthFlow } from '@/features/auth/flow';
import { passwordOk } from '@/features/auth/password';
import { PasswordField, PasswordRules } from '@/features/auth/PasswordField';
import { currentLanguage } from '@/store/prefs';
import { useSession } from '@/store/session';
import { Button, ErrorMessage, Header } from '@/ui';

export default function Reset() {
  const { t } = useTranslation();
  const router = useRouter();
  const flow = useAuthFlow();
  const signIn = useSession((s) => s.signIn);
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!passwordOk(password)) return setError(t('auth.errRules'));
    if (password !== repeat) return setError(t('auth.errMatch'));
    setError(undefined);
    setLoading(true);
    try {
      await authApi.resetPassword(flow.email, flow.code, password);
      // Entra directo con la contraseña nueva.
      const { data } = await authApi.login(flow.email, password);
      flow.set({ code: '' });
      if (data.token) await signIn(data);
      else router.replace('/login');
    } catch (e) {
      setError(errorText(e, currentLanguage()));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreen header={<Header title="" back />} title={t('auth.resetTitle')} description={t('auth.resetDesc')}>
      <View className="gap-4">
        <PasswordField
          label={t('auth.newPassword')}
          value={password}
          onChangeText={setPassword}
          autoComplete="new-password"
          textContentType="newPassword"
        />
        <PasswordRules value={password} />
        <PasswordField
          label={t('auth.repeatPassword')}
          value={repeat}
          onChangeText={setRepeat}
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="go"
          onSubmitEditing={submit}
        />
        {error ? <ErrorMessage message={error} /> : null}
      </View>
      <Button label={t('auth.resetCta')} onPress={submit} loading={loading} fullWidth />
    </AuthScreen>
  );
}
