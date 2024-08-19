import React, { memo, useCallback } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import { ANIMATION_STATE } from '../../constants';
import { animate } from '../../utilities';
import type { BottomSheetAnimateTopElementProps } from './types';

function BottomSheetAnimateTopElementComponent({
  animatedAnimationState,
  animatedIndex,
  animatedPosition,
  animateTopElementComponent: AnimateTopElementComponent,
}: BottomSheetAnimateTopElementProps) {
  const animatedContainerHeight = useSharedValue(0);
  const handleLayout = useCallback(
    function handleLayout({
      nativeEvent: {
        layout: { height },
      },
    }: LayoutChangeEvent) {
      animatedContainerHeight.value = height;
    },
    [animatedContainerHeight]
  );
  useAnimatedReaction(
    () => ({
      animationState: animatedAnimationState.value,
      containerHeight: animatedContainerHeight.value,
      index: animatedIndex!.value,
    }),
    (result, previousResult) => {
      const { animationState, containerHeight, index } = result;
      const previousAnimationState = previousResult?.animationState;
      const previousContainerHeight = previousResult?.containerHeight;
      const previousIndex = previousResult?.index;
      if (
        (animationState === previousAnimationState &&
          containerHeight === previousContainerHeight &&
          index === previousIndex) ||
        animationState !== ANIMATION_STATE.STOPPED
      ) {
        return;
      }
      if (index === 0) {
        animatedPosition.value = animate({
          point: animatedPosition.value - containerHeight,
        });
      } else if (index === -1) {
        animatedPosition.value = animatedPosition.value + containerHeight;
      }
    }
  );
  return AnimateTopElementComponent ? (
    <View onLayout={handleLayout}>
      <AnimateTopElementComponent />
    </View>
  ) : null;
}

const BottomSheetAnimateTopElement = memo(
  BottomSheetAnimateTopElementComponent
);
BottomSheetAnimateTopElement.displayName = 'BottomSheetAnimateTopElement';

export default BottomSheetAnimateTopElement;
