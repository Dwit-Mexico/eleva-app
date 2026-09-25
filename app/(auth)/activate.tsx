import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { APIError, errorText } from '@/api/client';
import { authApi } from '@/api/auth';
import { AuthScreen } from '@/features/auth/AuthScreen';
import { useAuthFlow } from '@/features/auth/flow';
import { passwordOk } from '@/features/auth/password';
import { PasswordField, PasswordRules } from '@/features/auth/PasswordField';
import { currentLanguage } from '@/store/prefs';
import { useSession } from '@/store/session';
import { Button, ErrorMessage, Header } from '@/ui';

// Primer ingreso: la cuenta tiene la contraseña de alta y debe elegir otra.
export default function Activate() {
  const { t } = useTranslation();
  const router = useRouter();
  const token = useAuthFlow((s) => s.activationToken);
  const setFlow = useAuthFlow((s) => s.set);
  const signIn = useSession((s) => s.signIn);
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!passwordOk(password)) return setError(t('auth.errRules'));
    if (password !== repeat) return setError(t('auth.errMatch'));
    if (!token) return setError(t('auth.expired'));
    setError(undefined);
    setLoading(true);
    try {
      const { data } = await authApi.activate(token, password);
      setFlow({ activationToken: null });
      await signIn(data);
    } catch (e) {
      // 401: venció el token de activación (15 min); hay que volver a entrar.
      setError(e instanceof APIError && e.status === 401 ? t('auth.expired') : errorText(e, currentLanguage()));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreen
      header={<Header title="" back={() => router.replace('/login')} />}
      title={t('auth.activate')}
      description={t('auth.activateIntro')}
    >
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
      <Button label={t('auth.activateCta')} onPress={submit} loading={loading} fullWidth />
    </AuthScreen>
  );
}
