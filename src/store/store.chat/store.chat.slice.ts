import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessages } from '../../interfaces/IChatListItem';
import { IChatState, nameStore } from './store.chat.types';

const initialState: IChatState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: nameStore,
  initialState,
  reducers: {
    chatAddMessage: (state, action: PayloadAction<IMessages>) => {
      state.messages?.push(action.payload);
    },
  }
});

export const { chatAddMessage } = chatSlice.actions;
export default chatSlice.reducer;
