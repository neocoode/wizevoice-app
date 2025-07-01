import React from 'react';
import Tts from 'react-native-tts';

import { IMessages } from '../../interfaces/IChatListItem';
import { TextoMensagem } from '../ChatMessage/styles';
import * as S from './styles';

interface IAgentMessageProps {
  item: IMessages;
}

const AgentMessage: React.FC<IAgentMessageProps> = ({ item }) => {
  const handleSpeak = async () => {
    try {
      await Tts.setDefaultLanguage(item.language);
      Tts.speak(item.texto);
    } catch (err) {
      console.warn('Erro ao configurar TTS:', err);
    }
  };

  return (
    <S.Row>
      <S.TouchableOpacity onPress={handleSpeak} activeOpacity={0.7}>
        <S.AgenteMessage>
          <TextoMensagem>{item.texto}</TextoMensagem>
        </S.AgenteMessage>
      </S.TouchableOpacity>
    </S.Row>
  );

};

export default AgentMessage;
