import React, { memo, useCallback } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import type { BottomSheetFixedTopElementProps } from './types';

function BottomSheetFixedTopElementComponent({
  animatedFixedContainerHeight,
  fixedTopElementComponent: FixedTopElementComponent,
}: BottomSheetFixedTopElementProps) {
  const handleLayout = useCallback(
    function handleLayout({
      nativeEvent: {
        layout: { height },
      },
    }: LayoutChangeEvent) {
      animatedFixedContainerHeight.value = height;
    },
    [animatedFixedContainerHeight]
  );

  return FixedTopElementComponent ? (
    <View onLayout={handleLayout}>
      <FixedTopElementComponent />
    </View>
  ) : null;
}

const BottomSheetFixedTopElement = memo(BottomSheetFixedTopElementComponent);
BottomSheetFixedTopElement.displayName = 'BottomSheetFixedTopElement';

export default BottomSheetFixedTopElement;
