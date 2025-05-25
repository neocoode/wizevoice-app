import axios from 'axios';

export interface GetDirectionsParams {
  accessToken: string;
  coordinates: [number, number][]; // [start, end]
  profile?: 'driving' | 'walking' | 'cycling';
  geometries?: 'geojson';
}

export async function getDirections({
  accessToken,
  coordinates,
  profile = 'driving',
  geometries = 'geojson',
}: GetDirectionsParams): Promise<any> {
  console.log('[getDirections] Chamado com:', { accessToken, coordinates, profile, geometries });
  const [start, end] = coordinates;

  const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=${geometries}&overview=full&access_token=${accessToken}`;
  console.log('[getDirections] URL:', url);
  const response = await axios.get(url);
  console.log('[getDirections] Resposta:', response.data);
  const route = response.data.routes?.[0];
  console.log('[getDirections] Rota:', route);
  if (!route || !route.geometry) {
    throw new Error('Rota inválida');
  }

  // Retorna um GeoJSON Feature
  return {
    type: 'Feature',
    geometry: route.geometry,
    properties: {},
  };
}
