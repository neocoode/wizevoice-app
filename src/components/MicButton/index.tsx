import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { BotaoMic } from './styles';

interface MicButtonProps {
  listening: boolean;
  onPress: () => void;
}

const Icon = MaterialCommunityIcons as any;

const MicButton: React.FC<MicButtonProps> = ({ listening, onPress }) => (
  <BotaoMic ativo={listening} onPress={onPress}>
    <Icon name={listening ? 'microphone-off' : 'microphone'} size={32} color="#fff" />
  </BotaoMic>
);

export default MicButton;
