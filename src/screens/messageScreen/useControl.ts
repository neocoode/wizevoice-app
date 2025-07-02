import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import { ESender } from '../../interfaces/IAutor';
import { ELanguage, IMessages } from '../../interfaces/IChatListItem';
import { useVoice } from './useVoice';

import { generateObjectId, toBase64 } from '../../utils';
import { addUserMessageThunk } from '../../store/store.chat/store.chat.redux';
import { useAppDispatch } from '../../app/hooks';

export function useMessageControl() {
  const dispatch = useAppDispatch();

  const {
    textoReconhecido,
    listening,
    status,
    startListening,
    stopListening,
  } = useVoice();

  const messages = useSelector((state: RootState) => state.chat.messages);
  const recognizedTextBase64 = textoReconhecido ? toBase64(textoReconhecido) : '';

  const toggleListening = async () => {
    if (listening) {
      const { texto, audioPath } = await stopListening();

      if (texto.length > 0) {
        const userMessage: IMessages = {
          id: generateObjectId(),
          texto,
          sender: ESender.User,
          language: ELanguage.PT_BR,
          createdAt: new Date().toISOString(),
          audioPath,
        };
        dispatch(addUserMessageThunk(userMessage));
      }
    } else {
      await startListening();
    }
  };

  return {
    messages,
    listening,
    status,
    toggleListening,
    recognizedTextBase64,
    textoReconhecido,
  };
}
