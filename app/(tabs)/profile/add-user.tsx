import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Building2, ChevronsUpDown } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { appApi } from '@/api/app';
import { errorText } from '@/api/client';
import { keys } from '@/api/queries';
import { validEmail } from '@/features/auth/password';
import { useActiveUnit } from '@/store/activeUnit';
import { currentLanguage } from '@/store/prefs';
import { BottomSheet, Button, ErrorMessage, Field, Header, Screen, useTheme } from '@/ui';

// Agregar persona (prototipo: isAddUser): vivienda, nombre, apellidos, correo
// y teléfono. La API le manda sus datos para entrar.
export default function AddUser() {
  const { t } = useTranslation();
  const router = useRouter();
  const qc = useQueryClient();
  const { palette } = useTheme();
  const { unit, units } = useActiveUnit();
  const [unitId, setUnitId] = useState(unit?.unitId);
  const [unitSheet, setUnitSheet] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ unit?: string; name?: string; email?: string; form?: string }>({});
  const [sending, setSending] = useState(false);
  const chosen = units.find((u) => u.unitId === unitId);

  const submit = async () => {
    const next = {
      unit: chosen ? undefined : t('users.errUnit'),
      name: firstName.trim() ? undefined : t('users.errName'),
      email: validEmail(email) ? undefined : t('users.errEmail'),
    };
    setErrors(next);
    if (next.unit || next.name || next.email || !chosen) return;
    setSending(true);
    try {
      await appApi.addMember({
        unitId: chosen.unitId,
        firstName: firstName.trim(),
        lastName: lastName.trim() || undefined,
        email: email.trim(),
        phone: phone.replace(/\D/g, '') || undefined,
      });
      await qc.invalidateQueries({ queryKey: keys.members });
      router.back();
    } catch (e) {
      setErrors({ form: errorText(e, currentLanguage()) });
    } finally {
      setSending(false);
    }
  };

  return (
    <Screen header={<Header title={t('users.addTitle')} back />} bodyClassName="gap-3.5 px-5 pb-7 pt-4">
      <View className="gap-1.5">
        <Text className="text-label font-medium text-text-soft">{t('users.unit')}</Text>
        <Pressable
          onPress={units.length > 1 ? () => setUnitSheet(true) : undefined}
          disabled={units.length < 2}
          accessibilityRole={units.length > 1 ? 'button' : undefined}
          accessibilityLabel={`${t('users.unit')}: ${chosen?.label ?? ''}`}
          className={`h-13 flex-row items-center gap-2.5 rounded-sm border bg-surface-2 px-3.5 ${errors.unit ? 'border-danger' : 'border-border'}`}
        >
          <Building2 size={18} color={palette.textMute} strokeWidth={2} />
          <Text className="flex-1 text-body text-text">{chosen?.label ?? ''}</Text>
          {units.length > 1 ? <ChevronsUpDown size={16} color={palette.brandSoft} strokeWidth={2} /> : null}
        </Pressable>
        {errors.unit ? <ErrorMessage message={errors.unit} /> : null}
      </View>
      <Field
        label={t('users.firstName')}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="María"
        maxLength={25}
        error={errors.name}
        autoCapitalize="words"
      />
      <Field
        label={t('users.lastName')}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Ferrer"
        maxLength={100}
        autoCapitalize="words"
      />
      <Field
        label={t('users.email')}
        value={email}
        onChangeText={setEmail}
        placeholder="maria@correo.com"
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={100}
      />
      <Field
        label={t('users.phone')}
        value={phone}
        onChangeText={setPhone}
        placeholder="998 000 0000"
        keyboardType="phone-pad"
        maxLength={15}
      />
      {errors.form ? <ErrorMessage message={errors.form} /> : null}
      <View className="mt-1.5">
        <Button label={t('users.submit')} onPress={submit} loading={sending} fullWidth />
      </View>

      <BottomSheet
        visible={unitSheet}
        onClose={() => setUnitSheet(false)}
        title={t('home.chooseUnit')}
        options={units.map((u) => ({
          label: u.label,
          tone: u.unitId === unitId ? 'primary' : 'neutral',
          onPress: () => {
            setUnitId(u.unitId);
            setUnitSheet(false);
          },
        }))}
      />
    </Screen>
  );
}
