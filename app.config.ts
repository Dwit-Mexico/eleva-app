import type { ExpoConfig } from 'expo/config';

// Identidad de tiendas: NO cambiar bundleIdentifier, package ni projectId, o
// la app deja de ser una actualización de la que ya está publicada (3.6.4).
const PROJECT_ID = '2c1ccd3f-c39a-498f-b339-c49cb9f40e47';

// APP_VARIANT=development: dev build con su propio id, para instalarlo junto a
// la app de tiendas (misma id + otra firma no se puede instalar). Sin Firebase:
// google-services.json solo conoce el package de producción.
const DEV = process.env.APP_VARIANT === 'development';

const config: ExpoConfig = {
  name: DEV ? 'Eleva (dev)' : 'Eleva',
  owner: 'dwit', // organización de Expo (transferido desde la cuenta personal)
  slug: 'elevaApp',
  version: '4.0.0',
  orientation: 'portrait',
  icon: './assets/appstore.png',
  scheme: DEV ? 'eleva-dev' : 'eleva',
  userInterfaceStyle: 'automatic',
  ios: {
    bundleIdentifier: DEV ? 'com.elevacapitalgroup.app.dev' : 'com.elevacapitalgroup.app',
    supportsTablet: false,
    requireFullScreen: true,
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    package: DEV ? 'com.elevapp.customerservice.dev' : 'com.elevapp.customerservice',
    // En EAS viene de un secret de tipo archivo; en local, del archivo (ignorado por git).
    googleServicesFile: DEV ? undefined : (process.env.GOOGLE_SERVICES_JSON ?? './google-services.json'),
    adaptiveIcon: {
      foregroundImage: './assets/appstore.png',
      backgroundColor: '#18191A',
    },
    permissions: ['CAMERA', 'VIBRATE', 'ACCESS_NETWORK_STATE'],
    blockedPermissions: ['android.permission.READ_CONTACTS'],
    predictiveBackGestureEnabled: false,
  },
  // Textos de permisos del sistema por idioma (iOS).
  locales: {
    es: './languages/es.json',
    en: './languages/en.json',
  },
  plugins: [
    'expo-router',
    'expo-font',
    'expo-secure-store',
    'expo-localization',
    ['expo-splash-screen', { image: './assets/splash2.png', backgroundColor: '#18191A', imageWidth: 200 }],
    [
      'expo-notifications',
      { icon: './assets/notification-icon.png', color: '#B29360', defaultChannel: 'default' },
    ],
    [
      'expo-image-picker',
      {
        cameraPermission: 'Para tomar fotos o video, permite que Eleva pueda usar la cámara',
        photosPermission: 'Para acceder a tus fotos, permite que Eleva pueda usar la galería',
        microphonePermission: 'Para grabar video con audio, permite que Eleva pueda usar el micrófono',
      },
    ],
    ['expo-video', { supportsBackgroundPlayback: false, supportsPictureInPicture: false }],
    ['expo-image', { disableLibdav1d: true }],
  ],
  // OTA: cambios de JS sin pasar por tienda. runtimeVersion = versión de la
  // app: un build nativo nuevo exige subir `version`.
  runtimeVersion: { policy: 'appVersion' },
  updates: { url: `https://u.expo.dev/${PROJECT_ID}` },
  experiments: { typedRoutes: true },
  extra: {
    eas: { projectId: PROJECT_ID },
  },
};

export default config;
