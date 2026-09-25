import { useRouter } from 'expo-router';
import { Mail } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, type TextInput } from 'react-native';

import { authApi } from '@/api/auth';
import { errorText } from '@/api/client';
import { AuthScreen } from '@/features/auth/AuthScreen';
import { useAuthFlow } from '@/features/auth/flow';
import { validEmail } from '@/features/auth/password';
import { PasswordField } from '@/features/auth/PasswordField';
import { currentLanguage, usePrefs } from '@/store/prefs';
import { useSession } from '@/store/session';
import { Button, Chip, ErrorMessage, Field } from '@/ui';

export default function Login() {
  const { t } = useTranslation();
  const router = useRouter();
  const signIn = useSession((s) => s.signIn);
  const setFlow = useAuthFlow((s) => s.set);
  const setLanguage = usePrefs((s) => s.setLanguage);
  const lang = currentLanguage();
  const passwordRef = useRef<TextInput>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const next = {
      email: validEmail(email) ? undefined : t('auth.errEmail'),
      password: password ? undefined : t('auth.errPassword'),
    };
    setErrors(next);
    if (next.email || next.password) return;
    setLoading(true);
    try {
      const { data } = await authApi.login(email.trim(), password);
      if (data.mustChangePassword && data.activationToken) {
        setFlow({ activationToken: data.activationToken, email: email.trim() });
        router.push('/activate');
      } else {
        await signIn(data); // el guard de la raíz lleva al Inicio
      }
    } catch (e) {
      setErrors({ form: errorText(e, lang) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreen
      logo
      description={t('auth.tagline')}
      top={
        <View className="flex-row justify-end gap-2" accessibilityLabel={t('auth.language')}>
          {(['es', 'en'] as const).map((l) => (
            <Chip key={l} label={l.toUpperCase()} selected={lang === l} onPress={() => setLanguage(l)} />
          ))}
        </View>
      }
    >
      <View className="gap-4">
        <Field
          label={t('auth.email')}
          icon={Mail}
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="username"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <PasswordField
          ref={passwordRef}
          label={t('auth.password')}
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={submit}
        />
        {errors.form ? <ErrorMessage message={errors.form} /> : null}
      </View>
      <View className="gap-2">
        <Button label={t('auth.start')} onPress={submit} loading={loading} fullWidth />
        <Button label={t('auth.forgot')} variant="ghost" onPress={() => router.push('/recover')} fullWidth />
      </View>
    </AuthScreen>
  );
}
