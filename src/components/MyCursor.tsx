import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PointAnnotation } from '@rnmapbox/maps';

interface MyCursorProps {
  coordinate: [number, number];
}

/**
 * Componente que representa a localização atual do usuário no mapa
 * @param coordinate - Coordenadas [longitude, latitude] da localização atual
 */
export const MyCursor: React.FC<MyCursorProps> = ({ coordinate }) => {
  return (
    <PointAnnotation
      id="myLocation"
      coordinate={coordinate}
      style={styles.cursor}
    >
      <View style={styles.cursor} />
    </PointAnnotation>
  );
};

const styles = StyleSheet.create({
  cursor: {
    width: 24,
    height: 24,
    backgroundColor: '#2196F3',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}); 