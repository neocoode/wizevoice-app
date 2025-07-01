import Voice from '@react-native-community/voice';
import { useEffect, useRef, useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import { ESender } from '../../interfaces/IAutor';
import { EStatus } from '../../interfaces/IChat';
import { ELanguage } from '../../interfaces/IChatListItem';
import { chatAddMessage } from '../../store/store.chat/store.chat.slice';

export type Mensagem = {
  id: string;
  texto: string;
  autor: 'usuario' | 'servidor';
};

function toBase64(str: string) {
  return typeof Buffer !== 'undefined'
    ? Buffer.from(str, 'utf-8').toString('base64')
    : btoa(unescape(encodeURIComponent(str)));
}

export function useControl() {
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState<EStatus>(EStatus.Wait);
  const [textoReconhecido, setTextoReconhecido] = useState<string>('');
  const [recognizedTextBase64, setRecognizedTextBase64] = useState<string>('');
  const isMounted = useRef(true);

  const states = useSelector((state: RootState) => state);
  useEffect(() => {
    console.log(2222222, states);
  });
  const messages = useSelector((state: RootState) => state.chat.messages);
  const dispatch = useDispatch();

  async function solicitarPermissaoAudio() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissão para usar o microfone',
            message: 'Precisamos acessar seu microfone para gravar sua voz.',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        Alert.alert('Erro ao solicitar permissão de áudio');
        return false;
      }
    }
    return true;
  }

  const startListening = async () => {
    try {
      setTextoReconhecido('');
      setStatus(EStatus.Wait);
      const permitido = await solicitarPermissaoAudio();
      if (!permitido) {
        setTextoReconhecido('');
        setStatus(EStatus.Wait);
        return;
      }
      setStatus(EStatus.Wait);
      await Voice.start('pt-BR');
      setListening(true);
    } catch (e: any) {
      setTextoReconhecido('');
      setStatus(EStatus.Wait);
      console.error('Erro ao iniciar:', e);
      Alert.alert('Erro ao iniciar gravação de voz', e?.message || '');
    }
  };

  const stopListening = async () => {
    try {
      setStatus(EStatus.Stop);
      await Voice.stop();
      setListening(false);
      setStatus(EStatus.Wait);
      if (textoReconhecido.trim().length > 0) {
        // Futuramente, poderá ser usado para enviar o texto em base64
      }
      setTextoReconhecido('');
    } catch (e) {
      setTextoReconhecido('');
      setStatus(EStatus.Wait);
      console.error('Erro ao parar:', e);
      Alert.alert('Erro ao parar gravação de voz');
    }
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    isMounted.current = true;

    Voice.onSpeechStart = () => setStatus(EStatus.Wait);
    Voice.onSpeechEnd = () => setStatus(EStatus.Wait);
    Voice.onSpeechResults = (e: { value?: string[] }) => {
      if (isMounted.current && Array.isArray(e.value) && e.value.length > 0) {
        setTextoReconhecido(e.value[0]);
      }
    };

    Voice.onSpeechError = (_e: any) => {
      setStatus(EStatus.Wait);
    };

    return () => {
      isMounted.current = false;
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    if (textoReconhecido) {
      setRecognizedTextBase64(toBase64(textoReconhecido));
      dispatch(chatAddMessage({
        id: String(Date.now()),
        texto: textoReconhecido,
        sender: ESender.User,
        language: ELanguage.PT_BR,
      }));
    }
  }, [textoReconhecido, dispatch]);

  return {
    messages,
    listening,
    status,
    toggleListening,
    recognizedTextBase64,
  };
} 