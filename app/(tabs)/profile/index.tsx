import { useRouter } from 'expo-router';
import {
  Accessibility,
  ChevronRight,
  KeyRound,
  Languages,
  LogOut,
  Moon,
  Sun,
  UserCheck,
  Users,
  type LucideIcon,
} from 'lucide-react-native';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { useUnits } from '@/api/queries';
import type { OwnerUnit } from '@/api/schemas';
import { formatDate } from '@/lib/relativeTime';
import { currentLanguage, usePrefs } from '@/store/prefs';
import { useSession } from '@/store/session';
import { BottomSheet, Header, Screen, Skeleton, useTheme } from '@/ui';

const SCALE_NAME = { 1: 'profile.sizeNormal', 1.3: 'profile.sizeBig', 1.6: 'profile.sizeHuge' } as const;

// Perfil (prototipo: isProfile): datos, rol, viviendas con su garantía y
// ajustes. "Personas con acceso" solo para el propietario.
export default function Profile() {
  const { t } = useTranslation();
  const router = useRouter();
  const { palette, name: theme } = useTheme();
  const user = useSession((s) => s.user);
  const signOut = useSession((s) => s.signOut);
  const units = useUnits();
  const { setTheme, setLanguage, textScale } = usePrefs();
  const lang = currentLanguage();
  const [logout, setLogout] = useState(false);
  const owner = !!user?.owner;
  const name = user?.name.trim() || user?.email || '';
  const initials =
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join('') || '·';

  return (
    <Screen header={<Header title={t('profile.title')} />}>
      <View className="flex-row items-center gap-3.5">
        <View className="h-14 w-14 items-center justify-center rounded-pill border border-border bg-surface-2">
          <Text className="text-[19px] font-semibold text-brand-soft">{initials}</Text>
        </View>
        <View className="min-w-0 flex-1">
          <Text className="text-[19px] font-semibold leading-6 text-text">{name}</Text>
          <Text className="text-caption text-text-soft">{user?.email}</Text>
        </View>
      </View>

      <View className="flex-row gap-2.5 rounded-md border border-border bg-surface-1 px-4 py-3.5">
        {owner ? (
          <KeyRound size={18} color={palette.brandSoft} strokeWidth={2} style={{ marginTop: 2 }} />
        ) : (
          <UserCheck size={18} color={palette.brandSoft} strokeWidth={2} style={{ marginTop: 2 }} />
        )}
        <View className="min-w-0 flex-1">
          <Text className="text-body leading-[22px] text-text">
            {owner ? t('profile.ownerTitle') : t('profile.guestTitle')}
          </Text>
          <Text className="mt-0.5 text-caption text-text-soft">
            {owner ? t('profile.ownerBody') : t('profile.guestBody', { unit: units.data?.[0]?.label ?? '' })}
          </Text>
        </View>
      </View>

      <View className="gap-2.5">
        <Text className="text-label font-medium text-text-mute">{t('profile.myUnits')}</Text>
        {units.isLoading ? (
          <Skeleton height={140} />
        ) : (
          (units.data ?? []).map((u) => <UnitWarranty key={u.contractId} u={u} />)
        )}
      </View>

      <View className="gap-2">
        {owner ? (
          <Row icon={Users} label={t('profile.users')} onPress={() => router.push('/profile/users')}>
            <ChevronRight size={18} color={palette.textMute} strokeWidth={2} />
          </Row>
        ) : null}
        <Row
          icon={theme === 'dark' ? Moon : Sun}
          label={t('profile.appearance')}
          onPress={() => setTheme(theme === 'dark' ? 'cream' : 'dark')}
        >
          <Value>{theme === 'dark' ? t('profile.themeDark') : t('profile.themeCream')}</Value>
        </Row>
        <Row icon={Accessibility} label={t('profile.a11y')} onPress={() => router.push('/profile/a11y')}>
          <Value>{t(SCALE_NAME[textScale])}</Value>
        </Row>
        <Row
          icon={Languages}
          label={t('profile.language')}
          onPress={() => setLanguage(lang === 'es' ? 'en' : 'es')}
        >
          <Value>{t('profile.languageName')}</Value>
        </Row>
        <Pressable
          onPress={() => setLogout(true)}
          accessibilityRole="button"
          className="min-h-13 flex-row items-center justify-center gap-2 rounded-md border border-border active:opacity-80"
        >
          <LogOut size={18} color={palette.danger} strokeWidth={2} />
          <Text className="text-[16px] font-semibold text-danger">{t('profile.logout')}</Text>
        </Pressable>
      </View>

      <BottomSheet
        visible={logout}
        onClose={() => setLogout(false)}
        title={t('profile.logoutQ')}
        body={t('profile.logoutBody')}
        options={[
          {
            label: t('profile.logout'),
            tone: 'danger',
            onPress: () => {
              setLogout(false);
              void signOut();
            },
          },
        ]}
      />
    </Screen>
  );
}

// Vivienda con la validez de la garantía (verde si sigue vigente).
function UnitWarranty({ u }: { u: OwnerUnit }) {
  const { t } = useTranslation();
  const [now] = useState(() => Date.now());
  const until = u.warrantyExpiresAt ? new Date(u.warrantyExpiresAt) : null;
  const months = until ? Math.floor((until.getTime() - now) / (30.44 * 86400000)) : null;
  const active = until ? until.getTime() > now : false;
  const left =
    months === null
      ? null
      : !active
        ? t('profile.warrantyOver')
        : months < 1
          ? t('profile.warrantyLastMonth')
          : t('profile.warrantyLeft', { count: months });
  return (
    <View className="gap-1.5 rounded-md border border-border bg-surface-1 p-4">
      <Text className="text-body-lg font-semibold text-brand-soft">{u.name}</Text>
      <Text className="text-body leading-[22px] text-text">{u.label}</Text>
      {u.address ? <Text className="text-caption text-text-soft">{u.address}</Text> : null}
      <View className="mt-1 flex-row flex-wrap items-center gap-2">
        <Text className="text-label font-medium text-text-mute">{t('profile.warranty')}</Text>
        {until ? (
          <View
            className={`min-h-[22px] justify-center rounded-pill px-2 py-0.5 ${active ? 'bg-success' : 'border border-border bg-surface-2'}`}
          >
            <Text
              className={`text-label font-semibold tracking-[0.24px] ${active ? 'text-ink' : 'text-text-soft'}`}
            >
              {formatDate(until)}
            </Text>
          </View>
        ) : (
          <Text className="text-label text-text-mute">{t('profile.noWarranty')}</Text>
        )}
      </View>
      {left ? <Text className="text-caption text-text-soft">{left}</Text> : null}
    </View>
  );
}

function Row({
  icon: Icon,
  label,
  onPress,
  children,
}: {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  children: ReactNode;
}) {
  const { palette } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="min-h-13 flex-row items-center gap-3 rounded-md border border-border bg-surface-1 px-4 active:opacity-80"
    >
      <Icon size={20} color={palette.brandSoft} strokeWidth={2} />
      <Text className="flex-1 text-[16px] text-text">{label}</Text>
      {children}
    </Pressable>
  );
}

function Value({ children }: { children: ReactNode }) {
  return <Text className="text-[14px] font-semibold text-brand-soft">{children}</Text>;
}
