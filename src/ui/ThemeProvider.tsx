import { createContext, useContext, type ReactNode } from 'react';
import { View } from 'react-native';

import { themeStyles } from './theme';
import { palettes, type Palette, type ThemeName } from './tokens';

type Theme = { name: ThemeName; palette: Palette };

const ThemeContext = createContext<Theme>({ name: 'dark', palette: palettes.dark });

// Aplica las variables CSS del tema a todo el árbol y expone la paleta para lo
// que NativeWind no alcanza (colores de íconos, tab bar, spinners).
export function ThemeProvider({ name, children }: { name: ThemeName; children: ReactNode }) {
  return (
    <ThemeContext.Provider value={{ name, palette: palettes[name] }}>
      <View style={themeStyles[name]} className="flex-1 bg-bg">
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
