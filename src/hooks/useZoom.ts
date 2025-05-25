// Hook responsável por gerenciar o zoom do mapa
import { useState } from 'react';

interface UseZoom {
  zoom: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  setZoom: (value: number) => void;
}

export function useZoom(initialZoom: number = 15, minZoom: number = 5, maxZoom: number = 18): UseZoom {
  const [zoom, setZoom] = useState<number>(initialZoom);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 1, maxZoom));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 1, minZoom));

  return {
    zoom,
    handleZoomIn,
    handleZoomOut,
    setZoom,
  };
} 