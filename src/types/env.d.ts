declare module '@env' {
  export const MAPBOX_ACCESS_TOKEN: string;
} 

declare module '@mapbox/mapbox-sdk/services/directions' {
  export default function mbxDirections(options: { accessToken: string }): any;
}

declare module 'react-native-vector-icons/MaterialIcons' {
  import { Component } from 'react';
  import { TextStyle, ViewStyle } from 'react-native';

  interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: TextStyle | ViewStyle;
  }

  export default class Icon extends Component<IconProps> {}
}
