// App principal apenas renderiza o componente MapView com o provider do contexto
import React from 'react';

import { MapView } from '../components/MapView';
import { ContextMapViewProvider } from '../context/ContextMapView';

export default function App() {
  return (
    <ContextMapViewProvider>
      <MapView />
    </ContextMapViewProvider>
  );
}
