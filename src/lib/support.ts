import { Linking } from 'react-native';

// Contacto de Customer Service (Llamar / WhatsApp del Inicio, detalle y
// agendar). El mismo número para los dos; se puede sobreescribir por env.
const phone = process.env.EXPO_PUBLIC_SUPPORT_PHONE ?? '+529982244555';
const whatsapp = process.env.EXPO_PUBLIC_SUPPORT_WHATSAPP ?? '529982244555';

export const support = {
  call: () => Linking.openURL(`tel:${phone}`),
  whatsapp: (text?: string) =>
    Linking.openURL(`https://wa.me/${whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`),
};
