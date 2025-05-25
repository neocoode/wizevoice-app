// Contexto para compartilhar o estado e funções do MapView entre os componentes.
import React, { createContext, useContext } from 'react';
import { useMapView } from '../hooks/useMapView';

const ContextMapView = createContext<any>(null);

export const ContextMapViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mapView = useMapView();
  return (
    <ContextMapView.Provider value={mapView}>
      {children}
    </ContextMapView.Provider>
  );
};

export function useContextMapView() {
  const context = useContext(ContextMapView);
  if (!context) {
    throw new Error('useContextMapView deve ser usado dentro de ContextMapViewProvider');
  }
  return context;
} 