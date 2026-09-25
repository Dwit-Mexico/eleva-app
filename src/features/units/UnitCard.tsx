import { Building2, ChevronsUpDown } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';

import type { OwnerUnit } from '@/api/schemas';
import { useActiveUnitStore } from '@/store/activeUnit';
import { BottomSheet, useTheme } from '@/ui';

// Tarjeta de la vivienda activa (prototipo: unitCard). Con más de una, tocarla
// abre la hoja para cambiarla. Con texto grande el contenido va en columna.
export function UnitCard({ unit, units }: { unit: OwnerUnit; units: OwnerUnit[] }) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { fontScale } = useWindowDimensions();
  const setUnit = useActiveUnitStore((s) => s.setUnit);
  const [open, setOpen] = useState(false);
  const many = units.length > 1;
  const body = (
    <View
      className={`gap-3.5 rounded-md border border-border bg-surface-1 p-4 ${fontScale > 1.15 ? 'items-start' : 'flex-row items-center'}`}
    >
      <View className="h-11 w-11 items-center justify-center rounded-pill border border-border bg-surface-2">
        <Building2 size={20} color={palette.brandSoft} strokeWidth={2} />
      </View>
      <View className="min-w-0 flex-1">
        <Text className="text-label font-medium text-text-mute">{many ? t('home.yourUnits') : t('home.yourUnit')}</Text>
        <Text className="mt-0.5 text-body-lg text-text">{unit.label}</Text>
      </View>
      {many ? (
        <View className="flex-row items-center gap-1">
          <Text className="text-caption font-semibold text-brand-soft">{t('home.change')}</Text>
          <ChevronsUpDown size={16} color={palette.brandSoft} strokeWidth={2} />
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
        accessibilityLabel={`${t('home.yourUnits')}: ${unit.label}. ${t('home.change')}`}
      >
        {body}
      </Pressable>
      <BottomSheet
        visible={open}
        onClose={() => setOpen(false)}
        title={t('home.chooseUnit')}
        options={units.map((u) => ({
          label: u.label,
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
