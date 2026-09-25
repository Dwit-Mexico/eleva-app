import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { authApi } from '@/api/auth';
import { errorText } from '@/api/client';
import { AuthScreen } from '@/features/auth/AuthScreen';
import { useAuthFlow } from '@/features/auth/flow';
import { passwordOk } from '@/features/auth/password';
import { PasswordField, PasswordRules } from '@/features/auth/PasswordField';
import { currentLanguage } from '@/store/prefs';
import { useSession } from '@/store/session';
import { Button, ErrorMessage } from '@/ui';

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

  // No está en el prototipo: sigue el patrón de activar.
  return (
    <AuthScreen title={t('auth.resetTitle')} back description={t('auth.resetDesc')}>
      <PasswordField
        label={t('auth.newPassword')}
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        autoComplete="new-password"
        textContentType="newPassword"
      />
      <PasswordField
        label={t('auth.repeatPassword')}
        value={repeat}
        onChangeText={setRepeat}
        placeholder="••••••••"
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="go"
        onSubmitEditing={submit}
      />
      <PasswordRules value={password} />
      {error ? <ErrorMessage message={error} /> : null}
      <Button label={t('auth.resetCta')} onPress={submit} loading={loading} fullWidth />
    </AuthScreen>
  );
}
