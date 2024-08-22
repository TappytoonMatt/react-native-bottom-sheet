import React, { memo, useCallback } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import BottomSheetAnimateTopElementBackground from '../bottomSheetAnimateTopElementBackground';
import { styles } from './styles';
import type { BottomSheetAnimateTopElementProps } from './types';

function BottomSheetAnimateTopElementComponent({
  animatedAnimateContainerHeight,
  animateTopElementBackgroundComponent:
    AnimateTopElementBackgroundComponent = BottomSheetAnimateTopElementBackground,
  animateTopElementComponent: AnimateTopElementComponent,
}: BottomSheetAnimateTopElementProps) {
  const handleContainerLayout = useCallback(
    function handleLayout({
      nativeEvent: {
        layout: { height },
      },
    }: LayoutChangeEvent) {
      if (height === 0) {
        animatedAnimateContainerHeight.value = 0;
      }
    },
    [animatedAnimateContainerHeight]
  );
  const handleContentLayout = useCallback(
    function handleLayout({
      nativeEvent: {
        layout: { height },
      },
    }: LayoutChangeEvent) {
      animatedAnimateContainerHeight.value = height;
    },
    [animatedAnimateContainerHeight]
  );

  return (
    // @ts-expect-error Server Component
    <View onLayout={handleContainerLayout}>
      {AnimateTopElementComponent ? (
        <AnimateTopElementBackgroundComponent style={styles.background}>
          {/* @ts-expect-error Server Component */}
          <View onLayout={handleContentLayout}>
            <AnimateTopElementComponent />
          </View>
        </AnimateTopElementBackgroundComponent>
      ) : null}
    </View>
  );
}

const BottomSheetAnimateTopElement = memo(
  BottomSheetAnimateTopElementComponent
);
BottomSheetAnimateTopElement.displayName = 'BottomSheetAnimateTopElement';

export default BottomSheetAnimateTopElement;
