// Hook para buscar rota entre origem e destino usando Mapbox Directions API
// Retorna o GeoJSON da linha da rota
import { useEffect, useState } from 'react';
import { getDirections } from '../services/mapboxApi';
import { useEnv } from './useEnv';


interface UseRouteToDestinationProps {
  origin: [number, number] | null;
  destination: [number, number] | null;
  profile?: 'driving' | 'walking' | 'cycling';
}

function fetchWithTimeout<T>(promise: Promise<T>, timeout = 10000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout)),
  ]);
}

export function useRouteToDestination({ origin, destination, profile }: UseRouteToDestinationProps) {
  const { mapbox } = useEnv();
  const [route, setRoute] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!origin || !destination) {
      setRoute(null);
      return;
    }

    async function fetchRoute() {
      setLoading(true);
      setError(null);
      try {
        const feature = await getDirections({
          accessToken: mapbox.token,
          profile: profile || 'driving',
          coordinates: [origin as [number, number], destination as [number, number]],
        });

        setRoute(feature);
        console.log('[useRouteToDestination] Rota carregada com sucesso');
      } catch (err) {
        console.error('[useRouteToDestination] Erro:', err);
        setError('Erro ao buscar rota');
        setRoute(null);
      } finally {
        setLoading(false);
      }
    }

    fetchRoute();
  }, [origin, destination, mapbox.token, profile]);

  return { route, loading, error };
}
 