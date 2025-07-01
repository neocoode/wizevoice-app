// Explicação: Estilos da tela de mensagem agora usam styled-components e cores do tema.
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ themeSelected }: any) => {
    console.log('🎨 Background color:', themeSelected?.colors?.background);
    return themeSelected.colors.background;
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