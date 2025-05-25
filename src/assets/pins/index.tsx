import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export const DestinationIcon: React.FC<IconProps> = ({ size = 16, color = 'white' }) => (
  <Svg width={size} height={size} viewBox="0 0 15 15">
    <Path
      d="M7.5 0.875C3.86548 0.875 0.875 3.86548 0.875 7.5C0.875 11.1345 3.86548 14.125 7.5 14.125C11.1345 14.125 14.125 11.1345 14.125 7.5C14.125 3.86548 11.1345 0.875 7.5 0.875ZM7.5 1.825C10.6217 1.825 13.175 4.37829 13.175 7.5C13.175 10.6217 10.6217 13.175 7.5 13.175C4.37829 13.175 1.825 10.6217 1.825 7.5C1.825 4.37829 4.37829 1.825 7.5 1.825Z"
      fill={color}
    />
  </Svg>
);

export default {
  DestinationIcon,
};
