declare module '@env' {
  export const MAPBOX_ACCESS_TOKEN: string;
} 

declare module '@mapbox/mapbox-sdk/services/directions' {
  export default function mbxDirections(options: { accessToken: string }): any;
}


