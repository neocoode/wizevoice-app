import React from 'react';
import * as St from './styles';
import { useMachine } from './useMachine';

interface CustomBottomSheetProps {
  maxHeightPercentage?: number;
  minHeightPercentage?: number;
  autoSnap?: boolean;
  pages: React.ReactNode[];
  pageSelected?: number;
  style?: {
    container?: object;
    content?: object;
  };
  intermediateSnap?: boolean;
  autoCloseTimeout?: number | null;
  fullscreen?: boolean;
}

const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  maxHeightPercentage = 0.9,
  minHeightPercentage = 0.3,
  autoSnap = true,
  pages,
  pageSelected,
  style,
  intermediateSnap = true,
  autoCloseTimeout = 10000,
  fullscreen = false,
}) => {
  const {
    maxHeight,
    panY,
    panResponder,
    currentPage,
    handleToggle,
  } = useMachine({
    maxHeightPercentage,
    minHeightPercentage,
    autoSnap,
    pages,
    pageSelected,
    intermediateSnap,
    autoCloseTimeout,
    fullscreen,
  });

  return (
    <St.SheetContainer
      style={[{ transform: [{ translateY: panY }] }, style?.container]}
      maxHeight={maxHeight}
      {...panResponder.panHandlers}
    >
      <St.DragIndicator activeOpacity={0.7} onPress={handleToggle} />
      <St.ContentContainer style={style?.content}>
        {currentPage}
      </St.ContentContainer>
    </St.SheetContainer>
  );
};

export default CustomBottomSheet; 