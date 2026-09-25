# eleva-app v4 — convenciones

Expo cambia entre versiones: antes de escribir código, lee la documentación
versionada de **SDK 57** (https://docs.expo.dev/versions/v57.0.0/).

## Stack
- Expo SDK 57, React Native 0.86, TypeScript estricto, **expo-router** (`app/`).
- **NativeWind 4** (Tailwind 3.4). Colores solo por clases semánticas
  (`bg-bg`, `text-text-soft`, `bg-brand`, `bg-warning-tint`…) o, donde
  NativeWind no llega (íconos, tab bar), por `src/ui/tokens.ts`. **Nunca un hex
  directo en una pantalla.** Temas `dark` y `cream` en `src/ui/theme.ts`.
- TanStack Query 5 (caché persistida en MMKV) para datos del servidor; Zustand
  para sesión, vivienda activa y preferencias; SecureStore para los tokens.
- API: solo la **v1** de api-go (`EXPO_PUBLIC_API_URL`), con su envelope
  `{success, message{en,es}, data, schema}`. Nada de Koa.
- zod 4 para los tipos de la API y los formularios (react-hook-form).
- i18next (ES/EN). Íconos: lucide-react-native, trazo 2, 18–24 px.

## Reglas
- Versiones exactas en `package.json` (sin `^` ni `~`); instalar con
  `bunx expo install <paquete>` y fijar la versión que resuelva.
- Código en inglés; comentarios en español.
- **Nunca** `allowFontScaling={false}`: la app crece con el texto del sistema.
- Un solo CTA dorado por pantalla; texto sobre dorado o semántico en `ink`.
  Sin sombras: la elevación es superficie + borde.
- Área táctil mínima 44 × 44; botón primario de 52 de alto.
- Commits de una línea, firmados.

## Identidad de tiendas (no cambiar)
`ios.bundleIdentifier = com.elevacapitalgroup.app`,
`android.package = com.elevapp.customerservice`, EAS projectId
`2c1ccd3f-c39a-498f-b339-c49cb9f40e47`. Los números de build viven en EAS
(`appVersionSource: remote`).

## Diseño
Handoff "Rediseño Eleva Customer Service" (README + prototipo + UI kit). La
fidelidad es alta: colores, tipografía, espaciado, radios, estados y textos son
finales.
