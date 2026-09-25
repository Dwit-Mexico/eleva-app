import { Redirect } from 'expo-router';
import { Inbox, Mail, Send } from 'lucide-react-native';
import { useState, type ReactNode } from 'react';
import { Text, View } from 'react-native';

import { usePrefs } from '@/store/prefs';
import {
  Banner,
  BottomSheet,
  Button,
  Card,
  Chip,
  EmptyState,
  Field,
  Header,
  MediaSlot,
  ReportCard,
  Screen,
  Skeleton,
  StatusBadge,
  StepIndicator,
} from '@/ui';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-label font-medium text-brand-soft">{title}</Text>
      {children}
    </View>
  );
}

// Catálogo de componentes base (solo en desarrollo) para revisar el UI kit
// contra el handoff en los dos temas y con texto grande.
export default function Components() {
  const { theme, setTheme } = usePrefs();
  const [area, setArea] = useState('Sala / Comedor');
  const [sheet, setSheet] = useState(false);
  const [email, setEmail] = useState('andres.sandoval@');
  const [now] = useState(() => Date.now());
  if (!__DEV__) return <Redirect href="/" />;
  return (
    <Screen
      header={<Header title="Componentes" subtitle="src/ui · solo desarrollo" back />}
      banner={<Banner tone="offline" text="Sin conexión · solo consulta" detail="Datos de las 10:42" />}
    >
      <Section title="Tema">
        <View className="flex-row flex-wrap gap-2">
          {(['system', 'dark', 'cream'] as const).map((t) => (
            <Chip key={t} label={t} selected={theme === t} onPress={() => setTheme(t)} />
          ))}
        </View>
      </Section>

      <Section title="Button">
        <Button label="Enviar" icon={Send} />
        <Button label="Regresar" variant="secondary" />
        <Button label="Ver todos" variant="ghost" />
        <Button label="Eliminar" variant="danger" />
        <View className="flex-row flex-wrap gap-2">
          <Button label="md · 44" size="md" />
          <Button label="Disabled" disabled />
          <Button label="Cargando" loading />
        </View>
      </Section>

      <Section title="Chip">
        <View className="flex-row flex-wrap gap-2">
          {['Cocina', 'Sala / Comedor', 'Terraza', 'Baño rec. ppal.', 'Rec. 2'].map((l) => (
            <Chip key={l} label={l} selected={area === l} onPress={() => setArea(l)} />
          ))}
        </View>
      </Section>

      <Section title="StatusBadge · IdEstado 1–10">
        <View className="flex-row flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
            <StatusBadge key={id} statusId={id} />
          ))}
        </View>
      </Section>

      <Section title="StepIndicator">
        <StepIndicator current={3} total={7} />
      </Section>

      <Section title="Field · ErrorMessage">
        <Field label="Correo electrónico" icon={Mail} hint="Usamos este correo para darte seguimiento." />
        <Field
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          error="Debes proporcionar un correo válido"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Field label="Comentario" multiline placeholder="Describe el detalle" />
      </Section>

      <Section title="MediaSlot">
        <View className="flex-row gap-3">
          <MediaSlot kind="photo" index={1} />
          <MediaSlot kind="photo" index={2} uri="https://picsum.photos/300" />
          <MediaSlot kind="video" />
        </View>
      </Section>

      <Section title="Card · ReportCard">
        <Card>
          <Text className="text-body text-text">Card simple (surface-1 + borde)</Text>
        </Card>
        <ReportCard
          folio="QA-101-2"
          statusId={8}
          createdAt={new Date(now - 2 * 86400000)}
          title="Fuga en tarja"
          location="Cocina · Tarja"
          cta="Valorar el servicio"
          onPress={() => {}}
        />
        <ReportCard
          folio="QA-101-1"
          statusId={4}
          createdAt={new Date(now - 3 * 3600000)}
          title="Puerta no cierra"
          location="Rec. 2 · Puerta"
        />
      </Section>

      <Section title="EmptyState">
        <EmptyState
          icon={Inbox}
          title="Sin reportes activos"
          text="Cuando reportes un detalle aparecerá aquí con su estatus."
          action={{ label: 'Nuevo reporte', onPress: () => {} }}
        />
      </Section>

      <Section title="Skeleton">
        <Skeleton />
        <Skeleton />
      </Section>

      <Section title="Banner">
        <Banner tone="success" text="Conexión recuperada" />
      </Section>

      <Section title="BottomSheet">
        <Button label="Abrir hoja" variant="secondary" onPress={() => setSheet(true)} />
        <BottomSheet
          visible={sheet}
          onClose={() => setSheet(false)}
          title="¿Cancelar el reporte?"
          body="El equipo dejará de darle seguimiento. Esta acción no se puede deshacer."
          options={[{ label: 'Cancelar reporte', tone: 'danger', onPress: () => setSheet(false) }]}
          cancelLabel="Conservar"
        />
      </Section>
    </Screen>
  );
}
