import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

// Importa todos os reducers combinados
import allReducers from '../store'; // ajuste o caminho conforme sua estrutura

// 🔐 Chave secreta para criptografia dos dados persistidos
const secretKey =
  '2f4e3c1690a7df06e72dbe658bbf39653c4e3cb1d5d324ac3f462b7e2c48be0b92c746372e8268eb9fbe379e08dd1f1a8f623c94666e5a93f65230b219621ed1';

const encryptor = encryptTransform({
  secretKey,
  onError: (error: any) => {
    console.error('Erro na criptografia do persist:', error);
  },
});

// ⚙️ Configuração do Redux Persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  transforms: [encryptor],
};

const rootReducer = combineReducers({
  ...allReducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Cria a store com suporte automático ao Redux DevTools (sem necessidade de composeWithDevTools)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
