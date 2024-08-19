import React, { memo, useCallback } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import type { BottomSheetFixedTopElementProps } from './types';

function BottomSheetFixedTopElementComponent({
  animatedPosition,
  fixedTopElementComponent: FixedTopElementComponent,
}: BottomSheetFixedTopElementProps) {
  const handleLayout = useCallback(
    function handleLayout({
      nativeEvent: {
        layout: { height },
      },
    }: LayoutChangeEvent) {
      animatedPosition.value = -height;
    },
    [animatedPosition]
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
