import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';

import { IMessages } from '../../interfaces/IChatListItem';
import ChatMessage from '../ChatMessage';

import { Container } from './styles';

interface ChatListProps {
  messages: IMessages[];
}

const ChatList: React.FC<ChatListProps> = ({ messages }) => {
  const flatListRef = useRef<FlatList<IMessages>>(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <Container>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <ChatMessage item={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </Container>
  );
};

export default ChatList;
