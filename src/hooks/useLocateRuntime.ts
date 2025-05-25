// Hook responsável por gerenciar a localização atual do usuário
import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@rnmapbox/maps';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePermission } from './usePermission';

interface GeoPosition {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
}

interface GeoError {
  code: number;
  message: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 segundos

export function useLocateRuntime() {
  console.log('[useLocateRuntime] Iniciando hook');
  
  const { errorMsg: permissionError, isLoading: permissionLoading, hasPermission } = usePermission();
  console.log('[useLocateRuntime] Status permissão:', { hasPermission, permissionError, permissionLoading });

  const [userLocation, setUserLocation] = useState<[number, number]>([-46.6333, -23.5505]); // São Paulo como localização inicial
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const retryCount = useRef(0);
  const retryTimeout = useRef<NodeJS.Timeout | null>(null);

  const clearRetryTimeout = () => {
    console.log('[useLocateRuntime] Limpando timeout de retry');
    if (retryTimeout.current) {
      clearTimeout(retryTimeout.current);
    }
  };

  const refreshLocation = useCallback(async () => {
    console.log('[useLocateRuntime] Iniciando refreshLocation');
    
    if (!hasPermission) {
      console.log('[useLocateRuntime] Sem permissão de localização');
      setErrorMsg('Permissão de localização não concedida');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      console.log('[useLocateRuntime] Obtendo posição atual');
      Geolocation.getCurrentPosition(
        (position: GeoPosition) => {
          console.log('[useLocateRuntime] Posição obtida com sucesso:', position);
          setUserLocation([position.coords.longitude, position.coords.latitude]);
          setIsLoading(false);
          retryCount.current = 0;
          clearRetryTimeout();
        },
        (error: GeoError) => {
          console.log('[useLocateRuntime] Erro ao obter posição:', error);
          if (retryCount.current < MAX_RETRIES) {
            retryCount.current += 1;
            console.log(`[useLocateRuntime] Tentativa ${retryCount.current} de ${MAX_RETRIES}`);
            retryTimeout.current = setTimeout(() => {
              refreshLocation();
            }, RETRY_DELAY);
            setErrorMsg(`Tentativa ${retryCount.current} de ${MAX_RETRIES}: ${error.message}`);
          } else {
            console.log('[useLocateRuntime] Máximo de tentativas atingido');
            setErrorMsg(`Não foi possível obter a localização após ${MAX_RETRIES} tentativas: ${error.message}`);
            setIsLoading(false);
            retryCount.current = 0;
            clearRetryTimeout();
          }
        },
        { 
          enableHighAccuracy: true, 
          timeout: 15000, 
          maximumAge: 10000 
        }
      );
    } catch (error) {
      console.log('[useLocateRuntime] Erro inesperado:', error);
      if (retryCount.current < MAX_RETRIES) {
        retryCount.current += 1;
        console.log(`[useLocateRuntime] Tentativa ${retryCount.current} de ${MAX_RETRIES}`);
        retryTimeout.current = setTimeout(() => {
          refreshLocation();
        }, RETRY_DELAY);
        setErrorMsg(`Tentativa ${retryCount.current} de ${MAX_RETRIES}: Erro ao obter localização`);
      } else {
        console.log('[useLocateRuntime] Máximo de tentativas atingido');
        setErrorMsg(`Não foi possível obter a localização após ${MAX_RETRIES} tentativas`);
        setIsLoading(false);
        retryCount.current = 0;
        clearRetryTimeout();
      }
    }
  }, [hasPermission]);

  useEffect(() => {
    console.log('[useLocateRuntime] Verificando erro de permissão:', permissionError);
    if (permissionError) {
      setErrorMsg(permissionError);
    }
  }, [permissionError]);

  useEffect(() => {
    console.log('[useLocateRuntime] Verificando permissão para iniciar localização:', hasPermission);
    if (hasPermission) {
      refreshLocation();
    }
  }, [hasPermission, refreshLocation]);

  useEffect(() => {
    console.log('[useLocateRuntime] Configurando cleanup');
    return () => {
      clearRetryTimeout();
    };
  }, []);

  const onUserLocationUpdate = (location: MapboxGL.Location) => {
    console.log('[useLocateRuntime] Atualização de localização do usuário:', location);
    setUserLocation([location.coords.longitude, location.coords.latitude]);
  };

  console.log('[useLocateRuntime] Estado atual:', { userLocation, errorMsg, isLoading });
  
  return {
    userLocation,
    errorMsg,
    isLoading: isLoading || permissionLoading,
    refreshLocation,
    hasPermission,
    onUserLocationUpdate,
  };
}