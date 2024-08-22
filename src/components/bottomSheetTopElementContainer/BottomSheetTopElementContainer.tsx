import React, { memo, useCallback } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { animate, print } from '../../utilities';
import BottomSheetAnimateTopElement from '../bottomSheetAnimateTopElement';
import BottomSheetFixedTopElement from '../bottomSheetFixedTopElement';
import { styles } from './styles';
import type { BottomSheetTopElementContainerProps } from './types';

function BottomSheetTopElementContainerComponent({
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
      fixedContainerHeight: animatedFixedContainerHeight.value,
      index: animatedIndex!.value,
    }),
    result => {
      const { animateContainerHeight, fixedContainerHeight, index } = result;
      if (index === 0) {
        animatedPosition.value = animate({
          point: -(fixedContainerHeight + animateContainerHeight),
        });
      } else if (index === -1) {
        animatedPosition.value = -fixedContainerHeight;
      }
    },
    [
      animatedAnimateContainerHeight.value,
      animatedFixedContainerHeight.value,
      animatedIndex!.value,
    ]
  );

  return (
    // @ts-expect-error Server Component
    <View style={styles.container}>
      {/* @ts-expect-error Server Component */}
      <Animated.View onLayout={handleLayout} style={containerAnimatedStyle}>
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
