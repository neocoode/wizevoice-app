import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Thunk assíncrono para buscar dados do driver
export const fetchDriverData = createAsyncThunk(
  'driver/fetchDriverData',
  async (_, thunkAPI) => {
    try {
      // Substitua por sua lógica real (pode ser axios, fetch, etc.)
      const response = await Promise.resolve('Driver data');
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.toString());
    }
  }
);

// Slice para o driver
const driverSlice = createSlice({
  name: 'driver',
  initialState: {
    data: null as string | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    resetDriver: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriverData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDriverData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDriverData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDriver } = driverSlice.actions;
export default driverSlice.reducer;
