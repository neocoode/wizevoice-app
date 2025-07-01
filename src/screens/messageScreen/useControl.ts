import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ESender } from '../../interfaces/IAutor';
import { ELanguage } from '../../interfaces/IChatListItem';
import { chatAddMessage } from '../../store/store.chat/store.chat.slice';
import { useVoice } from './useVoice';

function toBase64(str: string) {
  return typeof Buffer !== 'undefined'
    ? Buffer.from(str, 'utf-8').toString('base64')
    : btoa(unescape(encodeURIComponent(str)));
}

export function useControl() {
  const {
    textoReconhecido,
    listening,
    status,
    startListening,
    stopListening,
  } = useVoice();

  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);

  const recognizedTextBase64 = textoReconhecido ? toBase64(textoReconhecido) : '';

  const toggleListening = async () => {
    if (listening) {
      const { texto, audioPath } = await stopListening();

      if (texto.length > 0) {
        dispatch(
          chatAddMessage({
            id: String(Date.now()),
            texto,
            sender: ESender.User,
            language: ELanguage.PT_BR,
            createdAt: new Date().toISOString(),
            audioPath,
          })
        );
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
