import { PointAnnotation } from '@rnmapbox/maps';
import React from 'react';
import { EPins } from '../enums/EPins';
import { MapPin } from './pins/MapPin';

interface DestinationPinProps {
  coordinate: [number, number];
}

/**
 * Componente que representa o pin de destino no mapa
 * @param coordinate - Coordenadas [longitude, latitude] do destino
 */
export const DestinationPin: React.FC<DestinationPinProps> = ({ coordinate }) => {
  return (
    <PointAnnotation
      id="destination"
      coordinate={coordinate}
      title="Destino"
    >
      <MapPin name={EPins.FINISH_DESTINATION} size={30} color="#00d" />
    </PointAnnotation>
  );
};

