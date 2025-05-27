import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  background-color: #F3F3F3FF;
  position: relative;
`;

export const InputWrapper = styled.View`
  display: flex;  
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #222c36cc;
  border-radius: 16px;
  padding: 0 12px;
  height: 48px;
`;

export const SearchInput = styled.TextInput`
  display: flex;
  color: #fff;
  font-size: 16px;
  padding: 0 8px;
`;

export const IconButton = styled.TouchableOpacity`
  display: flex;
  padding: 6px;
`;

export const IconImage = styled.Image`
  display: flex;
  width: 22px;
  height: 22px;
  opacity: 0.7;
`;

export const Text = styled.Text`
  display: flex;
  font-size: 16px;
  color: #333;
`; 