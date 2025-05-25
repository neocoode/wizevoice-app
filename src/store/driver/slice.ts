import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Driver {
}

interface DriverState {
  currentDriver: Driver | null;
  loading: boolean;
  error: string | null;
}

const initialState: DriverState = {
  currentDriver: null,
  loading: false,
  error: null,
};

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setCurrentDriver: (state, action: PayloadAction<Driver | null>) => {
      state.currentDriver = action.payload;
    },
    setCurrentDriverSuccess: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCurrentDriverError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentDriver,
  setCurrentDriverSuccess,
  setCurrentDriverError,
} = driverSlice.actions;

export default driverSlice.reducer;
