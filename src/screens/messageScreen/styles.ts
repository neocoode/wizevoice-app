// Explicação: Estilos da tela de mensagem agora usam styled-components e cores do tema.
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: any) => {
    console.log('🎨 Background color:', theme?.colors?.background);
    return theme.colors.background;
  }};
  padding-bottom: 50px;
  padding-top: 100px;
`;

export const ChatList = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;
