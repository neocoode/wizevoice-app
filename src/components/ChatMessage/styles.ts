import styled from 'styled-components/native';

export const UsuarioMessage = styled.View`
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 16px;
  max-width: 80%;
  background-color: ${({ theme }: any) => theme.themeSelected.colors.userMessage};
  align-self: flex-end;
`;



export const TextoMensagem = styled.Text`
  font-size: 16px;
  color: ${({ theme }: any) => theme.themeSelected.colors.text};
`; 