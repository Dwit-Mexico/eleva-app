import { ChevronDown, Home } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import type { OwnerUnit } from '@/api/schemas';
import { useActiveUnitStore } from '@/store/activeUnit';
import { BottomSheet, useTheme } from '@/ui';

// Tarjeta de la vivienda activa. Con más de una, tocarla abre la hoja para
// cambiarla; con una sola no hay nada que cambiar.
export function UnitCard({ unit, units }: { unit: OwnerUnit; units: OwnerUnit[] }) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const setUnit = useActiveUnitStore((s) => s.setUnit);
  const [open, setOpen] = useState(false);
  const many = units.length > 1;
  const body = (
    <View className="flex-row items-center gap-3 rounded-md border border-border bg-surface-1 px-4 py-3.5">
      <View className="h-11 w-11 items-center justify-center rounded-pill bg-brand-tint">
        <Home size={20} color={palette.brandSoft} strokeWidth={2} />
      </View>
      <View className="flex-1">
        <Text className="text-label font-medium text-text-mute">{t('home.yourUnit')}</Text>
        <Text className="text-body-lg text-text">{unit.label}</Text>
        {/* label ya trae el proyecto ("101 - Torre"); abajo, la dirección. */}
        {unit.address ? <Text className="text-caption text-brand-soft">{unit.address}</Text> : null}
      </View>
      {many ? (
        <View className="flex-row items-center gap-1">
          <Text className="text-caption font-medium text-brand-soft">{t('home.change')}</Text>
          <ChevronDown size={16} color={palette.brandSoft} strokeWidth={2} />
        </View>
      ) : null}
    </View>
  );
  if (!many) return body;
  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`${t('home.yourUnit')}: ${unit.label}. ${t('home.change')}`}
      >
        {body}
      </Pressable>
      <BottomSheet
        visible={open}
        onClose={() => setOpen(false)}
        title={t('home.chooseUnit')}
        options={units.map((u) => ({
          label: `${u.label} · ${u.name}`,
          tone: u.unitId === unit.unitId ? 'primary' : 'neutral',
          onPress: () => {
            setUnit(u.unitId);
            setOpen(false);
          },
        }))}
      />
    </>
  );
}
