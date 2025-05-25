// Hook responsável por gerenciar a lógica do MapView: permissões, localização, zoom e handlers.
import MapboxGL from '@rnmapbox/maps';
import { useEffect, useRef, useState } from 'react';

import { useEnv } from './useEnv';
import { useLocateRuntime } from './useLocateRuntime';
import { useZoom } from './useZoom';

export function useMapView() {
  console.log('[useMapView] Inicializando hook');
  
  const env = useEnv();
  const locate = useLocateRuntime();
  const { zoom, handleZoomIn, handleZoomOut, setZoom } = useZoom(18, 5, 22);

  // Localização
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [destination, setDestination] = useState<[number, number] | null>(null);

  // Camera ref
  const cameraRef = useRef<MapboxGL.Camera>(null);

  // Configuração do Mapbox
  useEffect(() => {
    console.log('[useMapView] Configurando token do Mapbox', env.mapbox);
    MapboxGL.setAccessToken(env.mapbox.token);
    MapboxGL.setTelemetryEnabled(true);
  }, [env.mapbox.token]);

  // Efeito para atualizar a câmera quando o zoom ou localização mudar
  useEffect(() => {
    console.log('[useMapView] Localização do usuário atualizada:', locate.userLocation);
    console.log('[useMapView] Zoom atual:', zoom);
    
    if (locate.userLocation && cameraRef.current) {
      console.log('[useMapView] Atualizando câmera com nova localização');
      cameraRef.current.setCamera({
        centerCoordinate: locate.userLocation,
        zoomLevel: zoom,
        animationDuration: 1000,
      });
    }
  }, [locate.userLocation, zoom]);

  useEffect(() => {
    if (locate.errorMsg) {
      console.log('[useMapView] Erro detectado:', locate.errorMsg);
      setErrorMsg(locate.errorMsg);
    }
  }, [locate.errorMsg]);

  useEffect(() => {
    console.log('[useMapView] Estado de loading atualizado:', locate.isLoading);
    setIsLoading(locate.isLoading);
  }, [locate.isLoading]);

  return {
    ...locate,
    zoom,
    handleZoomIn,
    handleZoomOut,
    setZoom,
    errorMsg,
    isLoading,
    cameraRef,
    destination,
    setDestination,
  };
} 