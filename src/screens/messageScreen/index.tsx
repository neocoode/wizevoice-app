import ChatList from '../../components/ChatList';
import MicButton from '../../components/MicButton';
import * as S from './styles';
import { useControl } from './useControl';

const MessageScreen = () => {
  const { messages, listening,  toggleListening } = useControl();
  return (
    <S.Container>
      <S.ChatList>
        <ChatList mensagens={messages || []} />
      </S.ChatList>
      <S.Footer>
        <MicButton listening={listening} onPress={toggleListening} />
      </S.Footer>
    </S.Container>
  );
};

export default MessageScreen;
