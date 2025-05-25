import { combineReducers } from '@reduxjs/toolkit';
import driverReducer from '../store/driver/slice';

export const rootReducer = combineReducers({
  driver: driverReducer,
});