import { UserRound } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import { useSession } from '@/store/session';
import { Button, EmptyState, Header, Screen } from '@/ui';

// Provisional (fase 2): muestra la sesión y permite cerrarla. El perfil real
// llega en la fase 5.
export default function Profile() {
  const { t } = useTranslation();
  const user = useSession((s) => s.user);
  const signOut = useSession((s) => s.signOut);
  return (
    <Screen header={<Header title={t('tabs.profile')} />}>
      <EmptyState icon={UserRound} title={user?.name.trim() || '—'} text={user?.email} />
      <Text className="text-caption text-text-mute">
        {user?.owner ? 'Propietario' : 'Invitado'} · IdPersona {user?.id}
      </Text>
      <Button label="Cerrar sesión" variant="danger" onPress={() => void signOut()} fullWidth />
    </Screen>
  );
}
