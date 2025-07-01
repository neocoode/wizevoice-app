import React from 'react';
import Tts from 'react-native-tts';

import { ELanguage } from '../../interfaces/IChatListItem';
import { TextoMensagem } from '../ChatMessage/styles';
import * as S from './styles';

interface IAgentMessageProps {
  texto: string;
  language: ELanguage;
}

const AgentMessage: React.FC<IAgentMessageProps> = ({ texto, language }) => {
  const handleSpeak = () => {
    if (language === ELanguage.EN_US) {
      Tts.setDefaultLanguage('en-US');
      Tts.speak(texto);
    }
  };

  if (language === ELanguage.EN_US) {
    return (
      <S.Row>
        <S.TouchableOpacity onPress={handleSpeak} activeOpacity={0.7}>
          <S.AgenteMessage>
            <TextoMensagem>{texto}</TextoMensagem>
          </S.AgenteMessage>
        </S.TouchableOpacity>
      </S.Row>
    );
  }

  return (
    <S.AgenteMessage>
      <TextoMensagem>{texto}</TextoMensagem>
    </S.AgenteMessage>
  )
};

export default AgentMessage; 