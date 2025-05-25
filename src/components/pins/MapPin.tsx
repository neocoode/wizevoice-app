import React from 'react';
import { StyleSheet, View } from 'react-native';
import pins from '.';
import { EPins } from '../../enums/EPins';

interface MapPinProps {
  name: EPins;
  size?: number;
  color?: string;
}

/**
 * Componente que exibe ícones SVG do diretório assets/pins
 * @param name - Nome do ícone (sem extensão)
 * @param size - Tamanho do ícone (opcional, padrão: 16)
 * @param color - Cor do ícone (opcional, padrão: 'white')
 */
export const MapPin: React.FC<MapPinProps> = ({ 
  name, 
  size = 16, 
  color = 'white' 
}) => {
  console.log('[MapPin] Tentando carregar ícone:', { name, size, color });
  console.log('[MapPin] Ícones disponíveis:', Object.keys(pins));
  
  try {
    const IconComponent = pins[name];
    console.log('[MapPin] Componente do ícone:', IconComponent);

    if (!IconComponent) {
      console.warn(`[MapPin] Ícone "${name}" não encontrado`);
      return null;
    }

    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <IconComponent size={size} color={color} />
      </View>
    );
  } catch (error) {
    console.error(`[MapPin] Erro ao carregar o ícone "${name}":`, error);
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 