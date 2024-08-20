import React, { memo, useCallback } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import BottomSheetAnimateTopElementBackground from '../bottomSheetAnimateTopElementBackground';
import type { BottomSheetAnimateTopElementProps } from './types';

function BottomSheetAnimateTopElementComponent({
  animatedAnimateContainerHeight,
  animateTopElementBackgroundComponent:
    AnimateTopElementBackgroundComponent = BottomSheetAnimateTopElementBackground,
  animateTopElementComponent: AnimateTopElementComponent,
}: BottomSheetAnimateTopElementProps) {
  const handleLayout = useCallback(
    function handleLayout({
      nativeEvent: {
        layout: { height },
      },
    }: LayoutChangeEvent) {
      animatedAnimateContainerHeight.value = height;
    },
    [animatedAnimateContainerHeight]
  );
  return AnimateTopElementComponent ? (
    <AnimateTopElementBackgroundComponent>
      <View onLayout={handleLayout}>
        <AnimateTopElementComponent />
      </View>
    </AnimateTopElementBackgroundComponent>
  ) : null;
}

const BottomSheetAnimateTopElement = memo(
  BottomSheetAnimateTopElementComponent
);
BottomSheetAnimateTopElement.displayName = 'BottomSheetAnimateTopElement';

export default BottomSheetAnimateTopElement;
