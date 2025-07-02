import { useEffect, useRef, useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import Voice from '@react-native-community/voice';

import { EStatus } from '../../interfaces';
import { getUniqueAudioPath } from '../../utils';

const audioRecorderPlayer = new AudioRecorderPlayer();

export function useVoice() {
  const [status, setStatus] = useState<EStatus>(EStatus.Idle);
  const [listening, setListening] = useState(false);
  const [textoReconhecido, setTextoReconhecido] = useState('');
  const finalTextoRef = useRef('');
  const gravacaoPathRef = useRef('');
  const isMounted = useRef(true);

  async function requestAudioPermission() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  }

  const startListening = async () => {
    setTextoReconhecido('');
    finalTextoRef.current = '';
    setStatus(EStatus.Idle);

    const permitido = await requestAudioPermission();
    if (!permitido) {
      Alert.alert('Permissão negada para usar o microfone');
      return;
    }

    const audioPath = getUniqueAudioPath();
    gravacaoPathRef.current = audioPath;

    await audioRecorderPlayer.startRecorder(audioPath);
    await Voice.start('pt-BR');

    setListening(true);
    setStatus(EStatus.Listening);
  };

  const stopListening = async () => {
    setStatus(EStatus.Stopping);
    await Voice.stop();
    await audioRecorderPlayer.stopRecorder();
    setListening(false);
    setStatus(EStatus.Idle);

    return {
      texto: finalTextoRef.current.trim(),
      audioPath: gravacaoPathRef.current,
    };
  };

  useEffect(() => {
    isMounted.current = true;

    Voice.onSpeechStart = () => {
      setTextoReconhecido('');
      finalTextoRef.current = '';
      setStatus(EStatus.Listening);
    };

    Voice.onSpeechPartialResults = (e: { value?: string[] }) => {
      if (isMounted.current && e.value) {
        setTextoReconhecido(e.value[0] || '');
      }
    };

    Voice.onSpeechResults = (e: { value?: string[] }) => {
      if (isMounted.current && e.value) {
        finalTextoRef.current = e.value[0] || '';
        setTextoReconhecido(e.value[0] || '');
      }
    };

    Voice.onSpeechEnd = () => setStatus(EStatus.Processing);
    Voice.onSpeechError = () => setStatus(EStatus.Idle);

    return () => {
      isMounted.current = false;
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return {
    textoReconhecido,
    listening,
    status,
    startListening,
    stopListening,
  };
}
