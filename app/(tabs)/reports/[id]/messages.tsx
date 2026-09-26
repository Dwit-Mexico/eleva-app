import { ClipboardList } from 'lucide-react-native';

import { EmptyState, Header, Screen } from '@/ui';

// Provisional: se porta del prototipo en esta misma fase.
export default function Placeholder() {
  return (
    <Screen header={<Header title="" back />}>
      <EmptyState icon={ClipboardList} title="messages" text="Pantalla en construcción." />
    </Screen>
  );
}
