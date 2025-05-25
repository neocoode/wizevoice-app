import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../interfaces/IconProps';

/**
 * Ícone de destino para uso em pins no mapa
 */
const DestinationPinIcon: React.FC<IconProps> = ({ size = 16, color = 'white' }) => (
  <Svg width={size} height={size} viewBox="0 0 15 15" id="marker">
    <Path
      d="M7.5 1C5.42312 1 3 2.2883 3 5.56759C3 7.79276 6.46156 12.7117 7.5 14C8.42309 12.7117 12 7.90993 12 5.56759C12 2.2883 9.57688 1 7.5 1Z"
      fill={color}
    />
  </Svg>
);

export default DestinationPinIcon;
