import { useEffect, useRef } from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';

const { height: windowHeight } = Dimensions.get('window');

interface useMachineProps {
  maxHeightPercentage: number;
  minHeightPercentage: number;
  autoSnap: boolean;
  pages: React.ReactNode[];
  pageSelected?: number;
  intermediateSnap: boolean;
  autoCloseTimeout?: number | null;
  fullscreen?: boolean;
}

export function useMachine({
  maxHeightPercentage,
  minHeightPercentage,
  autoSnap,
  pages,
  pageSelected,
  intermediateSnap,
  autoCloseTimeout = 10000,
  fullscreen = false,
}: useMachineProps) {
  const maxHeight = fullscreen ? windowHeight : windowHeight * maxHeightPercentage;
  const minHeight = windowHeight * minHeightPercentage;
  const intermediateHeight = windowHeight * 0.5;
  // minY: aberto (topo), intermediateY: meio, maxY: fechado (mínimo)
  const minY = windowHeight - maxHeight;
  const intermediateY = windowHeight - intermediateHeight;
  const maxY = windowHeight - minHeight;

  const panY = useRef(new Animated.Value(maxY)).current;
  const panYInitial = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPage =
    pages && pages.length > 0
      ? pages[typeof pageSelected === 'number' ? pageSelected : 0]
      : null;

  // Função para iniciar/reiniciar o timer de auto-close
  const startAutoCloseTimer = () => {
    if (!autoCloseTimeout || autoCloseTimeout <= 0) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      Animated.spring(panY, {
        toValue: maxY,
        useNativeDriver: false,
      }).start();
    }, autoCloseTimeout);
  };

  // Limpa o timer ao desmontar
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        panY.stopAnimation((value) => {
          panYInitial.current = value;
        });
      },
      onPanResponderMove: (e, gestureState) => {
        let newY = panYInitial.current + gestureState.dy;
        if (newY < minY) newY = minY;
        if (newY > maxY) newY = maxY;
        panY.setValue(newY);
      },
      onPanResponderRelease: (e, gestureState) => {
        let newY = panYInitial.current + gestureState.dy;
        let snapPoints = [minY, maxY];
        if (intermediateSnap) snapPoints.splice(1, 0, intermediateY);
        // Clamp newY
        if (newY < minY) newY = minY;
        if (newY > maxY) newY = maxY;
        if (autoSnap) {
          let closest = snapPoints.reduce((prev, curr) => Math.abs(curr - newY) < Math.abs(prev - newY) ? curr : prev);
          Animated.spring(panY, {
            toValue: closest,
            useNativeDriver: false,
          }).start(() => {
            if (closest !== maxY) startAutoCloseTimer();
          });
        } else {
          Animated.spring(panY, {
            toValue: newY,
            useNativeDriver: false,
          }).start(() => {
            if (newY !== maxY) startAutoCloseTimer();
          });
        }
      },
    })
  ).current;

  // Iniciar timer ao abrir (quando currentPage muda)
  useEffect(() => {
    if (autoCloseTimeout && autoCloseTimeout > 0) {
      startAutoCloseTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Função para alternar abrir/fechar pelo DragIndicator
  const handleToggle = () => {
    panY.stopAnimation((value: number) => {
      if (Math.abs(value - maxY) < 10) {
        // Abrir
        Animated.spring(panY, {
          toValue: minY,
          useNativeDriver: false,
        }).start();
      } else {
        // Fechar
        Animated.spring(panY, {
          toValue: maxY,
          useNativeDriver: false,
        }).start();
      }
    });
  };

  return {
    maxHeight,
    minHeight,
    panY,
    panResponder,
    currentPage,
    handleToggle,
  };
} 