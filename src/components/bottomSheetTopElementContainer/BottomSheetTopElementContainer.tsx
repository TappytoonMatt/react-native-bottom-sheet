import React, { memo, useCallback } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { ANIMATION_STATE } from '../../constants';
import { animate, print } from '../../utilities';
import BottomSheetAnimateTopElement from '../bottomSheetAnimateTopElement';
import BottomSheetFixedTopElement from '../bottomSheetFixedTopElement';
import { styles } from './styles';
import type { BottomSheetTopElementContainerProps } from './types';

function BottomSheetTopElementContainerComponent({
  animatedAnimationState,
  animatedIndex,
  animateTopElementBackgroundComponent,
  animateTopElementComponent,
  fixedTopElementComponent,
  topElementHeight,
}: BottomSheetTopElementContainerProps) {
  const animatedAnimateContainerHeight = useSharedValue(0);
  const animatedFixedContainerHeight = useSharedValue(0);
  const animatedPosition = useSharedValue(0);
  const handleLayout = useCallback(
    function handleLayout({
      nativeEvent: {
        layout: { height },
      },
    }: LayoutChangeEvent) {
      topElementHeight.value = height;

      print({
        component: BottomSheetTopElementContainer.displayName,
        method: 'topElementContainerLayout',
        params: {
          height,
        },
      });
    },
    [topElementHeight]
  );
  const containerAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: animatedPosition.value,
        },
      ],
    }),
    [animatedPosition]
  );
  useAnimatedReaction(
    () => ({
      animateContainerHeight: animatedAnimateContainerHeight.value,
      animationState: animatedAnimationState.value,
      fixedContainerHeight: animatedFixedContainerHeight.value,
      index: animatedIndex!.value,
    }),
    (result, previousResult) => {
      const {
        animateContainerHeight,
        animationState,
        fixedContainerHeight,
        index,
      } = result;
      const previousAnimateContainerHeight =
        previousResult?.animateContainerHeight;
      const previousAnimationState = previousResult?.animationState;
      const previousFixedContainerHeight = previousResult?.fixedContainerHeight;
      const previousIndex = previousResult?.index;
      if (
        (animateContainerHeight === previousAnimateContainerHeight &&
          animationState === previousAnimationState &&
          fixedContainerHeight === previousFixedContainerHeight &&
          index === previousIndex) ||
        animationState !== ANIMATION_STATE.STOPPED
      ) {
        return;
      }
      if (index === 0) {
        animatedPosition.value = animate({
          point: -(fixedContainerHeight + animateContainerHeight),
        });
      } else if (index === -1) {
        animatedPosition.value = -fixedContainerHeight;
      }
    }
  );

  return (
    <View style={styles.container}>
      <Animated.View
        onLayout={handleLayout}
        style={containerAnimatedStyle}
      >
        <BottomSheetFixedTopElement
          animatedFixedContainerHeight={animatedFixedContainerHeight}
          fixedTopElementComponent={fixedTopElementComponent}
        />
        <BottomSheetAnimateTopElement
          animatedAnimateContainerHeight={animatedAnimateContainerHeight}
          animateTopElementBackgroundComponent={
            animateTopElementBackgroundComponent
          }
          animateTopElementComponent={animateTopElementComponent}
        />
      </Animated.View>
    </View>
  );
}

const BottomSheetTopElementContainer = memo(
  BottomSheetTopElementContainerComponent
);
BottomSheetTopElementContainer.displayName = 'BottomSheetTopElementContainer';

export default BottomSheetTopElementContainer;
