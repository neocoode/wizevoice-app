import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMapsSearch } from '../../interfaces/maps';
import { MapsState, nameStore } from './store.maps.types';

const initialState: MapsState = {
  search: undefined,
};

// Slice para o driver
const mapsSlice = createSlice({
  name: nameStore,
  initialState,
  reducers: {
    mapsSetSearch: (state, action: PayloadAction<IMapsSearch>) => {
      state.search = action.payload;
    },
  }
});

export const { mapsSetSearch } = mapsSlice.actions;
export default mapsSlice.reducer;
