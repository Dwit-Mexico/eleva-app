export default {
  expo: {
    name: "Eleva",
    slug: "elevaApp",
    version: "2.0.1",
    orientation: "portrait",
    icon: "./assets/appstore.png",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash2.png",
      resizeMode: "contain",
      backgroundColor: "#18191A",
    },
    plugins: [
      [
        "expo-dev-client",
        {
          launchMode: "most-recent",
        },
      ],
      [
        "expo-notifications",
        {
          icon: "./assets/notification-icon.png",
          color: "#ffffff",
        },
      ],
      [
        "expo-image-picker",
        {
          cameraPermission:
            "Para tomar fotos o video, permite que Eleva pueda usar la cámara",
          photosPermission:
            "Para acceder a tus fotos, permite que Eleva pueda usar la galería",
          microphonePermission:
            "Para grabar audio, permite que Eleva pueda usar el micrófono",
        },
      ],
      "expo-localization",
    ],
    updates: {
      enabled: false,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: false,
      buildNumber: "5",
      bundleIdentifier: "com.elevacapitalgroup.app",
      requireFullScreen: true,
      infoPlist: {
        CFBundleAllowMixedLocalizations: true,
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    locales: {
      es: "./languages/es.json",
      en: "./languages/en.json",
    },
    android: {
      package: "com.elevapp.customerservice",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      permissions: [
        "VIBRATE",
        "CAMERA",
        "READ_CONTACTS",
        "NOTIFICATIONS",
        "ACCESS_NETWORK_STATE",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
      ],
      versionCode: 23,
    },
    extra: {
      eas: {
        projectId: "2c1ccd3f-c39a-498f-b339-c49cb9f40e47",
      },
    },
  },
};
