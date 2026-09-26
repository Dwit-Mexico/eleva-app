import { MessageCircle, Phone } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { support } from '@/lib/support';
import { useTheme } from '@/ui';

// Llamar (surface-2) y WhatsApp (brand), 48 de alto (prototipo: contactBtns).
export function ContactButtons({ folio }: { folio?: string }) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  return (
    <View className="flex-row gap-2.5">
      <Pressable
        onPress={support.call}
        accessibilityRole="button"
        className="min-h-12 flex-1 flex-row items-center justify-center gap-2 rounded-md border border-border bg-surface-2 active:opacity-80"
      >
        <Phone size={18} color={palette.text} strokeWidth={2} />
        <Text className="text-body font-semibold text-text">{t('detail.call')}</Text>
      </Pressable>
      <Pressable
        onPress={() => support.whatsapp(folio)}
        accessibilityRole="button"
        className="min-h-12 flex-1 flex-row items-center justify-center gap-2 rounded-md bg-brand active:opacity-80"
      >
        <MessageCircle size={18} color={palette.ink} strokeWidth={2} />
        <Text className="text-body font-semibold text-ink">{t('detail.whatsapp')}</Text>
      </Pressable>
    </View>
  );
}
