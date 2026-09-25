# Eleva · app de propietarios (v4)

App de Customer Service de Eleva para propietarios e invitados: reportar un
detalle de la vivienda, seguirlo, agendar la visita, valorar la reparación,
mensajes con el equipo, documentos y notificaciones. Reescritura desde cero
del rediseño 2026 sobre la API v1 (api-go). La 3.6.4 (Koa) quedó en el tag
`v3.6.4` de `master`.

## Correr en local
```sh
bun install
cp .env.example .env          # EXPO_PUBLIC_API_URL
bunx expo run:android         # dev build en el emulador (primera vez)
bun start                     # después, solo Metro
```
Hace falta un dev build (expo-dev-client): MMKV y otros módulos nativos no
corren en Expo Go. `google-services.json` (Firebase `eleva-54c99`, push en
Android) va en la raíz y no se versiona; en EAS es un secret de archivo
(`GOOGLE_SERVICES_JSON`).

## Scripts
| comando | qué hace |
|---|---|
| `bun run check` | typecheck + lint + tests (lo mismo que CI) |
| `bun run test` | Jest (jest-expo) |
| `bun run format` | Prettier con el plugin de Tailwind |

## Builds (EAS)
| perfil | canal | para qué |
|---|---|---|
| development | development | dev client interno |
| preview | preview | APK / TestFlight interno para QA |
| production | production | tiendas (`autoIncrement`, submit a Play internal y App Store Connect) |

`runtimeVersion` sigue a `version`: un cambio nativo exige subir la versión;
los cambios de JS pueden salir por OTA (`eas update --channel <canal>`).

## Estructura
```
app/        rutas (expo-router)
src/api     cliente v1, esquemas zod y hooks de datos
src/ui      tokens, temas y componentes base del rediseño
src/store   sesión, vivienda activa, preferencias
languages/  textos de permisos del sistema (iOS)
```
