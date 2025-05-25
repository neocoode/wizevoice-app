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
  const zoom = useZoom(15, 5, 20);

  // Localização
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Camera ref
  const cameraRef = useRef<MapboxGL.Camera>(null);

  // Configuração do Mapbox
  useEffect(() => {
    console.log('[useMapView, ] Configurando token do Mapbox', env.mapbox);
  }, [env.mapbox.token]);

  useEffect(() => {
    console.log('[useMapView] Localização do usuário atualizada:', locate.userLocation);
    console.log('[useMapView] Zoom atual:', zoom.zoom);
    
    if (locate.userLocation && cameraRef.current) {
      console.log('[useMapView] Atualizando câmera com nova localização');
      cameraRef.current.setCamera({
        centerCoordinate: locate.userLocation,
        zoomLevel: zoom.zoom,
        animationDuration: 1000,
      });
    }
  }, [locate.userLocation, zoom.zoom]);

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
    ...zoom,
    errorMsg,
    isLoading,
    cameraRef,
  };
} 