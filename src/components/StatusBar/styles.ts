// Explicação: Estilo da StatusBar agora usa cor do tema.
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const StatusText = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${({ theme }: any) => theme.colors.statusBar};
  margin-top: 8px;
  margin-bottom: 4px;
`;

const styles = StyleSheet.create({
  status: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
  },
});

export default styles;
