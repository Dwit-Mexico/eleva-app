export default {
  expo: {
    name: "Eleva",
    slug: "elevaApp",
    version: "1.3.0",
    orientation: "portrait",
    icon: "./assets/appstore.png",
    splash: {
      image: "./assets/splash2.png",
      resizeMode: "contain",
      backgroundColor: "#18191A",
    },
    plugins: [
      [
        "expo-notifications",
        {
          icon: "./assets/notification-icon.png",
          color: "#ffffff",
        },
      ],
      [
        "expo-camera",
        {
          cameraPermissions:
            "Para tomar fotos o video, permite que Eleva pueda usar la cámara",
          recordAudioAndroid: false,
        },
      ],
      [
        "expo-image-picker",
        {
          cameraPermissions:
            "Para tomar fotos o video, permite que Eleva pueda usar la cámara",
          recordAudioAndroid: false,
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
