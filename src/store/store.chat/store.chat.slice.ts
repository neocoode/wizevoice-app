import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ESender } from '../../interfaces/IAutor';
import { ELanguage, IMessages } from '../../interfaces/IChatListItem';
import { IChatState, nameStore } from './store.chat.types';
import { addUserMessageThunk } from './store.chat.redux';
import { generateObjectId } from '../../utils';

interface IChatStateWithStatus extends IChatState {
  loading: boolean;
  error: string | null;
}

const initialState: IChatStateWithStatus = {
  messages: [
    {
      id: generateObjectId(),
      texto: "Hello, how can I help you today?",
      sender: ESender.Agent,
      language: ELanguage.EN_US,
    },
    {
      id: generateObjectId(),
      texto: "Estou aqui para ajudar você com qualquer dúvida que você tenha.",
      sender: ESender.Agent,
      language: ELanguage.PT_BR,
    },
    {
      id: generateObjectId(),
      texto: "Eu quero aprender inglês",
      sender: ESender.User,
      language: ELanguage.PT_BR,
    },
  ],
  loading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: nameStore,
  initialState,
  reducers: {
    chatAddMessage: (state, action: PayloadAction<IMessages>) => {
      state.messages?.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserMessageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserMessageThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addUserMessageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao adicionar mensagem';
      });
  },
});

export const { chatAddMessage } = chatSlice.actions;
export default chatSlice.reducer;

// Exemplo de uso:
// dispatch(addUserMessageThunk({
//   id: '3',
//   texto: 'Olá, quero aprender inglês',
//   sender: ESender.User,
//   language: ELanguage.PT_BR
// }))
