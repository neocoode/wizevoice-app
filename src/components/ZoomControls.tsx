import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

/**
 * Componente que exibe os botões de controle de zoom do mapa
 * @param onZoomIn - Função chamada ao clicar no botão de aumentar zoom
 * @param onZoomOut - Função chamada ao clicar no botão de diminuir zoom
 */
export const ZoomControls: React.FC<ZoomControlsProps> = ({ onZoomIn, onZoomOut }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onZoomIn}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onZoomOut}>
        <Text style={styles.text}>-</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 