// Explicação: Usa StatusText estilizado com tema ao invés de Text padrão.
import React from 'react';
import { StatusText } from './styles';

interface StatusBarProps {
  status: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ status }) => (
  <StatusText>{status}</StatusText>
);

export default StatusBar; 