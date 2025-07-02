import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addUserMessageThunk } from '../store.chat/store.chat.redux';
import { authGetTokenThunk } from './store.auth.redux';

interface AuthState {
      token: string | null;
}

interface IAuthStateWithStatus extends AuthState {
      loading: boolean;
      error: string | null;
}

const initialAuthState: IAuthStateWithStatus = {
      token: null,
      loading: false,
      error: null,
};

export const authSlice = createSlice({
      name: 'auth',
      initialState: initialAuthState,
      reducers: {
            setToken: (state, action: PayloadAction<string>) => {
                  state.token = action.payload;
            },
            clearToken: (state) => {
                  state.token = null;
            },
      },
      extraReducers: (builder) => {
            builder
              .addCase(authGetTokenThunk.pending, (state) => {
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

export const { setToken, clearToken } = authSlice.actions;
