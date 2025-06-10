// App principal apenas renderiza o componente MapView com o provider do contexto
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './routes';
import { persistor, store } from './store';

const App = () => {
  
  useEffect(() => {
    MaterialIcons.loadFont(); // carrega uma vez ao iniciar o app
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
