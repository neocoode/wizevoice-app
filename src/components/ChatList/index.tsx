import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';

import { ESender } from '../../interfaces/IAutor';
import { ELanguage, IMessages } from '../../interfaces/IChatListItem';
import ChatMessage from '../ChatMessage';

import { Container } from './styles';

interface ChatListProps {
  mensagens: IMessages[];
}

const ChatList: React.FC<ChatListProps> = ({ mensagens }) => {
  const flatListRef = useRef<FlatList<IMessages>>(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [mensagens]);

  return (
    <Container>
      <FlatList
        ref={flatListRef}
        data={mensagens}
        renderItem={({ item }) => <ChatMessage texto={item.texto} sender={item.sender as ESender} language={item.language as ELanguage} />}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

export default ChatList; 