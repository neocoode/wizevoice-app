import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

interface UsePermissionReturn {
  errorMsg: string | null;
  isLoading: boolean;
  hasPermission: boolean;
}

export function usePermission(): UsePermissionReturn {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            setErrorMsg('Permissão de localização negada');
            setHasPermission(false);
            setIsLoading(false);
            return;
          }

          setHasPermission(true);
          setIsLoading(false);
        } catch (err) {
          setErrorMsg('Erro ao solicitar permissão de localização');
          setHasPermission(false);
          setIsLoading(false);
        }
      } else {
        // iOS já solicita permissão automaticamente
        setHasPermission(true);
        setIsLoading(false);
      }
    };

    requestLocationPermission();
  }, []);

  return {
    errorMsg,
    isLoading,
    hasPermission,
  };
} 