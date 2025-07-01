import React from 'react';

import { ESender } from '../../interfaces/IAutor';
import { ELanguage } from '../../interfaces/IChatListItem';
import AgentMessage from '../AgentMessage';
import UserMessage from '../UserMessage';

interface IChatMessageProps {
  texto: string;
  sender: ESender;
  language: ELanguage;  
}

const ChatMessage: React.FC<IChatMessageProps> = ({ texto, sender, language   }) => {
  return (sender === ESender.User ? (
    <UserMessage texto={texto} />
  ) : (
    <AgentMessage texto={texto} language={language} />)
  );

}

export default ChatMessage;

