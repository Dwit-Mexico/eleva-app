const { withGradleProperties } = require('expo/config-plugins');

// Memoria de Gradle para compilar en release: con los 2 GB / 512 MB de
// Metaspace del template, ksp y lint se quedan sin Metaspace en máquinas con
// el emulador abierto. También limita los workers para no saturar la RAM.
const PROPS = {
  'org.gradle.jvmargs': '-Xmx4096m -XX:MaxMetaspaceSize=1536m',
  'org.gradle.workers.max': '4',
};

module.exports = function withGradleMemory(config) {
  return withGradleProperties(config, (cfg) => {
    for (const [key, value] of Object.entries(PROPS)) {
      const item = cfg.modResults.find((p) => p.type === 'property' && p.key === key);
      if (item) item.value = value;
      else cfg.modResults.push({ type: 'property', key, value });
    }
    return cfg;
  });
};
