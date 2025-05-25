import {
      DriverState,
      SET_CURRENT_DRIVER,
      SET_NEARBY_DRIVERS,
      UPDATE_DRIVER_LOCATION,
      SET_DRIVER_STATUS,
      SET_LOADING,
      SET_ERROR,
} from './types';

const initialState: DriverState = {
      currentDriver: null,
      nearbyDrivers: [],
      loading: false,
      error: null,
};

export const driverReducer = (state = initialState, action: any): DriverState => {
      switch (action.type) {
            case SET_CURRENT_DRIVER:
                  return {
                        ...state,
                        currentDriver: action.payload,
                  };
            case SET_NEARBY_DRIVERS:
                  return {
                        ...state,
                        nearbyDrivers: action.payload,
                  };
            case UPDATE_DRIVER_LOCATION:
                  return {
                        ...state,
                        currentDriver: state.currentDriver
                              ? {
                                    ...state.currentDriver,
                                    location: action.payload,
                              }
                              : null,
                  };
            case SET_DRIVER_STATUS:
                  return {
                        ...state,
                        currentDriver: state.currentDriver
                              ? {
                                    ...state.currentDriver,
                                    status: action.payload,
                              }
                              : null,
                  };
            case SET_LOADING:
                  return {
                        ...state,
                        loading: action.payload,
                  };
            case SET_ERROR:
                  return {
                        ...state,
                        error: action.payload,
                  };
            default:
                  return state;
      }
};
