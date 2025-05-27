/* eslint-disable react-native/no-inline-styles */
// Componente responsável por exibir o mapa, centralizar na localização do usuário e fornecer botões de zoom.
// Consome o contexto ContextMapView para acessar estado e funções do mapa.

import React, { useEffect } from 'react';
import { Text } from 'react-native';

import MapboxGL, { Camera, UserLocation } from '@rnmapbox/maps';
import { useMapView } from '../../hooks/useMapView';
import { useRouteToDestination } from '../../hooks/useRouteToDestination';
import { DestinationPin } from '../DestinationPin';
import { MyCursor } from '../MyCursor';
import { ZoomControls } from '../ZoomControls';
import * as S from './styles';




export const MapView: React.FC = () => {
  
  const {
    userLocation,
    errorMsg,
    isLoading,
    zoom,
    handleZoomIn,
    handleZoomOut,
    onUserLocationUpdate,
    cameraRef,
    destination,
    setDestination,
  } = useMapView();

  // Hook para buscar rota
  const { route } = useRouteToDestination({
    profile: 'driving',
    origin: userLocation,
    destination,
  });

  console.log('[MapView] Estado inicial:', { userLocation, errorMsg, isLoading, zoom, destination });

  // Define o destino apenas uma vez quando o componente monta
  useEffect(() => {
    setDestination([-46.676934, -23.579272]);
  }, []);
  
  if (isLoading) {
    console.log('[MapView] Carregando localização...');
    return (
      <S.Container>
        <Text>Carregando localização...</Text>
      </S.Container>
    );
  }

  if (errorMsg) {
    console.log('[MapView] Erro:', errorMsg);
    return (
      <S.Container>
        <Text>Erro: {errorMsg}</Text>
      </S.Container>
    );
  }

  const handleUserLocationUpdate = (location: any) => {
    console.log('[MapView] Localização atualizada:', location);
    onUserLocationUpdate(location);
  };


  return (
    <S.Container>
      <MapboxGL.MapView
        style={S.mapView}
        styleURL={MapboxGL.StyleURL.Street}
        logoEnabled={false}
        attributionEnabled={false}
      >
        <Camera
          ref={cameraRef}
          zoomLevel={zoom}
          centerCoordinate={userLocation}
          followUserLocation
          followUserMode={MapboxGL.UserTrackingMode.Follow}
          followZoomLevel={zoom}
        />
        <UserLocation
          visible={true}
          onUpdate={handleUserLocationUpdate}
        />
        <MyCursor coordinate={userLocation} />
          {destination && (
            <>
              <DestinationPin coordinate={destination} />
              {route && (
                <MapboxGL.ShapeSource id="routeSource" shape={route}>
                  <MapboxGL.LineLayer
                    id="routeLine"
                    style={{
                      lineColor: [
                        'case',
                        ['in', ['get', 'congestion', ['get', 'properties']], ['literal', ['low']]], '#4CAF50',
                        ['in', ['get', 'congestion', ['get', 'properties']], ['literal', ['moderate']]], '#FFC107',
                        ['in', ['get', 'congestion', ['get', 'properties']], ['literal', ['severe']]], '#F44336',
                        '#007AFF',
                      ],
                      lineWidth: 4,
                      lineCap: 'round',
                      lineJoin: 'round',
                    }}
                  />
                </MapboxGL.ShapeSource>
              )}
            </>
          )}
      </MapboxGL.MapView>
      <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
    </S.Container>
  );
};

