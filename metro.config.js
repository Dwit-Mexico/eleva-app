const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// inlineRem: false deja rem en tiempo de ejecución: src/store/prefs.ts lo fija
// en 16 × tamaño de texto.
module.exports = withNativeWind(getDefaultConfig(__dirname), { input: './global.css', inlineRem: false });
