// Explicação: Estilos do componente AgentMessage.
import styled from 'styled-components/native';

export const Row = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const SpeakerButton = styled.View`
  margin-left: 8px;
  justify-content: center;
`; 

export const TouchableOpacity = styled.TouchableOpacity`
  margin-left: 8px;
  justify-content: center;
`; 

export const AgenteMessage = styled.View`
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 16px;
  max-width: 80%;
  background-color: ${({ theme }: any) => theme.themeSelected.colors.agentMessage};
  align-self: flex-start;
`;