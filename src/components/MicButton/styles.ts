// Explicação: Estilos do botão de microfone agora usam styled-components e cores do tema.
import styled from 'styled-components/native';

export const BotaoMic = styled.TouchableOpacity<{ ativo?: boolean }>`
  background-color: ${({ theme, ativo }: any) => (ativo ? theme.colors.micButtonActive : theme.colors.micButton)};
  border-radius: 32px;
  padding: 16px;
  elevation: 2;
`;
