// Componente responsável por exibir o mapa, centralizar na localização do usuário e fornecer botões de zoom.
// Consome o contexto ContextMapView para acessar estado e funções do mapa.

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapboxGL, { Camera, UserLocation } from '@rnmapbox/maps';
import { useMapView } from '../hooks/useMapView';
import { MyCursor } from './MyCursor';
import { ZoomControls } from './ZoomControls';

export const MapView: React.FC = () => {
  
  const {
    userLocation,
    errorMsg,
    isLoading,
    zoom,
    handleZoomIn,
    handleZoomOut,
    onUserLocationUpdate,
  } = useMapView();

  console.log('[MapView] Estado inicial:', { userLocation, errorMsg, isLoading, zoom });

  if (isLoading) {
    console.log('[MapView] Carregando localização...');
    return (
      <View style={styles.container}>
        <Text>Carregando localização...</Text>
      </View>
    );
  }

  if (errorMsg) {
    console.log('[MapView] Erro:', errorMsg);
    return (
      <View style={styles.container}>
        <Text>Erro: {errorMsg}</Text>
      </View>
    );
  }

  const handleUserLocationUpdate = (location: any) => {
    console.log('[MapView] Localização atualizada:', location);
    onUserLocationUpdate(location);
  };

  console.log('[MapView] Renderizando mapa com:', { userLocation, zoom });

  return (
    <View style={styles.container}>
      <MapboxGL.MapView 
        style={styles.map}
        styleURL={MapboxGL.StyleURL.Street}
      >
        <Camera
          zoomLevel={zoom}
          centerCoordinate={userLocation}
          followUserLocation
        />
        <UserLocation
          visible={true}
          onUpdate={handleUserLocationUpdate}
        />
        <MyCursor coordinate={userLocation} />
      </MapboxGL.MapView>
      <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
});