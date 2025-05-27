import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const SheetContainer = styled(Animated.View)<{ maxHeight: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({ maxHeight }) => maxHeight}px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-width: 1px;
  border-color: #e0e0e0;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.14;
  shadow-radius: 5px;
  elevation: 8;
  background-color: #FFFFFFFF;
`;

export const ContentContainer = styled.View`
  display: flex;
  margin-right: 10px;
  margin-left: 10px;
`;

export const DragIndicator = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 5px;
  border-radius: 2.5px;
  background-color: #7E7E7EFF;
  align-self: center;
  margin-top: 8px;
  margin-bottom: 8px;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.115;
  shadow-radius: 5px;
  elevation: 8;
`;
