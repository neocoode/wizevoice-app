import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
      key: 'root',
      storage: AsyncStorage,
      whitelist: ['driver'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) => {
            const middlewares = getDefaultMiddleware({
                  serializableCheck: {
                        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                  },
            });
            return middlewares.concat(sagaMiddleware);
      },
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 