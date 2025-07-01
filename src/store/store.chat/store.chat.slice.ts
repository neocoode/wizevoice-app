import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ESender } from '../../interfaces/IAutor';
import { ELanguage, IMessages } from '../../interfaces/IChatListItem';
import { IChatState, nameStore } from './store.chat.types';

const initialState: IChatState = {
  messages: [
    {
      id: "",
      texto: "Hello, how can I help you today?",
      sender: ESender.Agent,
      language: ELanguage.EN_US,
    },
    {
      id: "",
      texto: "Estou aqui para ajudar você com qualquer dúvida que você tenha.",
      sender: ESender.Agent,
      language: ELanguage.PT_BR,
    },
    {
      id: "2",
      texto: "Eu quero aprender inglês",
      sender: ESender.User,
      language: ELanguage.PT_BR,
    },
  ],
};

export const chatSlice = createSlice({
  name: nameStore,
  initialState,
  reducers: {
    chatAddMessage: (state, action: PayloadAction<IMessages>) => {
      state.messages?.push(action.payload);
    },
  },
});

export const { chatAddMessage } = chatSlice.actions;
export default chatSlice.reducer;
