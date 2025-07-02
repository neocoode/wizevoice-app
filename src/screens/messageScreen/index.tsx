import ChatList from '../../components/ChatList';
import MicButton from '../../components/MicButton';
import { useMessageControl } from './useControl';
import log from '../../utils/log';

import * as S from './styles';
import { useEffect } from 'react';
import { authGetTokenThunk } from '../../store/store.auth/store.auth.redux';
import { useAppDispatch } from '../../app/hooks';

const MessageScreen = () => {
  const { messages, listening, toggleListening } = useMessageControl();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authGetTokenThunk());
  }, []);

  return (
    <S.Container>
      <S.ChatList>
        <ChatList messages={messages || []} />
      </S.ChatList>
      <S.Footer>
        <MicButton listening={listening} onPress={toggleListening} />
      </S.Footer>
    </S.Container>
  );
};

export default MessageScreen;
