module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    // react-native-worklets/plugin reemplaza al de reanimated y va al final.
    plugins: ['react-native-worklets/plugin'],
  };
};
