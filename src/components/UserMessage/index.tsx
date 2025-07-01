import React from 'react';
import { TouchableOpacity } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import styled from 'styled-components/native';

import { TextoMensagem, UsuarioMessage } from '../ChatMessage/styles';

interface IUserMessageProps {
  texto: string;
  audioPath?: string;
}

const Row = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const UserMessage: React.FC<IUserMessageProps> = ({ texto, audioPath }) => {
  const audioPlayer = new AudioRecorderPlayer();

  const handlePlayAudio = async () => {
    if (audioPath) {
      try {
        await audioPlayer.startPlayer(audioPath);
      } catch (err) {
        console.warn('Erro ao reproduzir áudio:', err);
      }
    }
  };

  return (
    <Row>
      <TouchableOpacity onPress={handlePlayAudio} disabled={!audioPath}>
        <UsuarioMessage>
          <TextoMensagem>
            {texto} {audioPath ? '🔊' : ''}
          </TextoMensagem>
        </UsuarioMessage>
      </TouchableOpacity>
    </Row>
  );
};

export default UserMessage;
