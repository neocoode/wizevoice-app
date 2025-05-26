// stores/store.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

// Import slices
import allReducers from '../store';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'], // quais slices você quer persistir
};

const rootReducer = combineReducers({
  ...allReducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
    }),
});

export const persistor = persistStore(store);

// Tipos
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
