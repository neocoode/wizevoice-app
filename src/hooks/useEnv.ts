// Hook responsável por gerenciar as variáveis de ambiente
import { MAPBOX_ACCESS_TOKEN } from '@env';

interface Env {
  mapbox: {
    token: string;
  };
}

/**
 * Hook que fornece acesso às variáveis de ambiente
 * @returns Objeto com as variáveis de ambiente
 */
export function useEnv(): Env {
  console.log('[useEnv] Inicializando hook');

  if (!MAPBOX_ACCESS_TOKEN) {
    console.error('[useEnv] Token do Mapbox não encontrado!');
    throw new Error('Token do Mapbox não encontrado no arquivo .env');
  }

  console.log('[useEnv] Token do Mapbox carregado com sucesso');

  return {
    mapbox: {
      token: MAPBOX_ACCESS_TOKEN,
    },
  };
} 