// Explicação: Este arquivo exporta o ThemeProvider do styled-components e um hook para acessar o tema atual (dark como padrão, mas detecta o sistema).

import React, { ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { darkColors, lightColors } from './colors';

const darkTheme = { colors: darkColors };
const lightTheme = { colors: lightColors };

export function useAppTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return { isDark, colorScheme, themeSelected: isDark ? darkTheme : lightTheme };
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { themeSelected } = useAppTheme();
  return <StyledThemeProvider theme={themeSelected}>{children}</StyledThemeProvider>;
}

export default ThemeProvider;
