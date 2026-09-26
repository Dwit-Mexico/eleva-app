import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MailCheck } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { APIError, errorText } from '@/api/client';
import { authApi } from '@/api/auth';
import { AuthScreen } from '@/features/auth/AuthScreen';
import { useAuthFlow } from '@/features/auth/flow';
import { passwordOk } from '@/features/auth/password';
import { PasswordField, PasswordRules } from '@/features/auth/PasswordField';
import { currentLanguage } from '@/store/prefs';
import { useSession } from '@/store/session';
import { Button, ErrorMessage, useTheme } from '@/ui';

// Primer ingreso: la cuenta tiene la contraseña de alta y debe elegir otra.
export default function Activate() {
  const { t } = useTranslation();
  const router = useRouter();
  const token = useAuthFlow((s) => s.activationToken);
  const setFlow = useAuthFlow((s) => s.set);
  const signIn = useSession((s) => s.signIn);
  const { palette } = useTheme();
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
      setError(
        e instanceof APIError && e.status === 401 ? t('auth.expired') : errorText(e, currentLanguage()),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreen title={t('auth.activate')} back={() => router.replace('/login')} lang>
      <View className="flex-row gap-3 rounded-md border border-border bg-surface-1 p-4">
        <MailCheck size={20} color={palette.brandSoft} strokeWidth={2} style={{ marginTop: 2 }} />
        <Text className="flex-1 text-body leading-[1.375rem] text-text-soft">{t('auth.activateIntro')}</Text>
      </View>
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
      <Button label={t('auth.activateCta')} onPress={submit} loading={loading} fullWidth />
    </AuthScreen>
  );
}
