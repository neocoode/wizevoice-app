import { chatSlice } from './store.chat/store.chat.slice';
import { authSlice } from './store.auth/store.auth.slice';

const reducers = {
  chat: chatSlice.reducer,
  auth: authSlice.reducer,
};

export default reducers;

