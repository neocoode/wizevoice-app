import { IMapsSearch } from "../../interfaces/maps";

export const nameStore = 'maps';

export interface MapsState {
  search: IMapsSearch | undefined;
}

