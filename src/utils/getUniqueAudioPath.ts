// Função utilitária para gerar um caminho único para arquivos de áudio
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

export function getUniqueAudioPath() {
  const filename = `audio_${Date.now()}.m4a`;
  return Platform.select({
    ios: filename,
    android: `${RNFS.CachesDirectoryPath}/${filename}`,
  })!;
} 