import React from 'react';

import { ESender } from '../../interfaces/IAutor';
import { IMessages } from '../../interfaces/IChatListItem';
import AgentMessage from '../AgentMessage';
import UserMessage from '../UserMessage';

interface IChatMessageProps {
  item: IMessages;
}

const ChatMessage: React.FC<IChatMessageProps> = ({ item }) => {
  return (item.sender === ESender.User ? (
    <UserMessage texto={item.texto} audioPath={item.audioPath} />
  ) : (
    <AgentMessage item={item} />)
  );

};

export default ChatMessage;

