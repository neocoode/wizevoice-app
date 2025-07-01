import React from 'react';
import styled from 'styled-components/native';

import { TextoMensagem, UsuarioMessage } from '../ChatMessage/styles';

interface IUserMessageProps {
  texto: string;
}

const Row = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const UserMessage: React.FC<IUserMessageProps> = ({ texto }) => (
  <Row>
    <UsuarioMessage>
      <TextoMensagem>{texto}</TextoMensagem>
    </UsuarioMessage>
  </Row>
);

export default UserMessage; 