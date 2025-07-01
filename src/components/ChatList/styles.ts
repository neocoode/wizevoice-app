import styled from 'styled-components/native';

export const Container = styled.View`
  flex-grow: 1;
  justify-content: flex-end;
  padding: 16px;
  background-color: ${({ theme }: any) => theme.themeSelected.colors.background};
`; 