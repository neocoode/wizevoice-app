import axios from 'axios';

export interface GetDirectionsParams {
  accessToken: string;
  coordinates: [number, number][]; // [start, end]
  profile?: 'driving' | 'walking' | 'cycling' | 'driving-traffic';
  geometries?: 'geojson';
  annotations?: string[];
  alternatives?: boolean;
}

export async function getDirections({
  accessToken,
  coordinates,
  profile = 'driving',
  geometries = 'geojson',
  annotations = ['congestion', 'speed', 'distance'],
  alternatives = true,
}: GetDirectionsParams): Promise<any> {
  const [start, end] = coordinates;
  let queryParams = new URLSearchParams();

  if (geometries) { queryParams.append('geometries', geometries); }
  if (annotations?.length) { queryParams.append('annotations', annotations.join(',')); }
  if (alternatives) { queryParams.append('alternatives', alternatives.toString()); }
  queryParams.append('access_token', accessToken);

  const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/` +
    `${start[0]},${start[1]};${end[0]},${end[1]}` +
    `?${queryParams.toString()}`;

  const response = await axios.get(url);
  const route = response.data.routes?.[0];
  if (!route || !route.geometry) {
    throw new Error('Rota inválida');
  }

  return {
    type: 'Feature',
    geometry: route.geometry,
    properties: {
      congestion: route.legs?.[0]?.annotation?.congestion || [],
      duration: route.duration,
      distance: route.distance,
    },
  };
}
