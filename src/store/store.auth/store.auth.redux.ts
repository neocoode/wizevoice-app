import { createAsyncThunk } from '@reduxjs/toolkit';
import log from '../../utils/log';
import { setToken } from './store.auth.slice';
import { getToken } from '../../services/wizevoiceapi';

export const authGetTokenThunk = createAsyncThunk(
  'auth/getToken',
  async (_, { dispatch }) => {
    try {
      log.info('authGetTokenThunk', 'start');
      const token = await getToken();
      dispatch(setToken(token));
      return true;
    } catch (error) {
      log.error('authGetTokenThunk', error);
      return false;
    }
  }
);
