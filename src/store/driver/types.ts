export interface Driver {
  id: string;
  name: string;
  vehicle: {
    model: string;
    plate: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  status: 'available' | 'busy' | 'offline';
}

export interface DriverState {
  currentDriver: Driver | null;
  loading: boolean;
  error: string | null;
}

// Action Types
export const SET_CURRENT_DRIVER = 'driver/setCurrentDriver';
export const SET_CURRENT_DRIVER_SUCCESS = 'driver/setCurrentDriverSuccess';
export const SET_CURRENT_DRIVER_ERROR = 'driver/setCurrentDriverError';

// Action Interfaces
export interface SetCurrentDriverAction {
  type: typeof SET_CURRENT_DRIVER;
  payload: Driver | null;
}

export interface SetCurrentDriverSuccessAction {
  type: typeof SET_CURRENT_DRIVER_SUCCESS;
  payload: boolean;
}

export interface SetCurrentDriverErrorAction {
  type: typeof SET_CURRENT_DRIVER_ERROR;
  payload: string | null;
}

export type DriverActionTypes =
  | SetCurrentDriverAction
  | SetCurrentDriverSuccessAction
  | SetCurrentDriverErrorAction; 