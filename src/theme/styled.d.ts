// Explicação: Tipagem customizada para o tema do styled-components, agora refletindo o objeto fornecido pelo ThemeProvider.
import 'styled-components';

import { darkColors } from './colors';

type AppColors = typeof darkColors;

export interface AppTheme {
  colors: AppColors;
}

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
