import { Linking } from 'react-native';

// Contacto de Customer Service (Llamar / WhatsApp del detalle y del Inicio).
// Pendiente: los números reales; mientras tanto vienen de env y, si faltan,
// los botones se ven pero no hacen nada.
const phone = process.env.EXPO_PUBLIC_SUPPORT_PHONE ?? '';
const whatsapp = process.env.EXPO_PUBLIC_SUPPORT_WHATSAPP ?? '';

export const support = {
  call: () => (phone ? Linking.openURL(`tel:${phone}`) : undefined),
  whatsapp: (text?: string) =>
    whatsapp
      ? Linking.openURL(`https://wa.me/${whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`)
      : undefined,
};
