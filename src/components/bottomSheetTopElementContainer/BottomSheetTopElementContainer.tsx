import React, { memo, useCallback } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { print } from '../../utilities';
import BottomSheetAnimateTopElement from '../bottomSheetAnimateTopElement';
import BottomSheetFixedTopElement from '../bottomSheetFixedTopElement';
import { styles } from './styles';
import type { BottomSheetTopElementContainerProps } from './types';

function BottomSheetTopElementContainerComponent({
  animatedAnimationState,
  animatedIndex,
  animateTopElementComponent,
  fixedTopElementComponent,
  topElementHeight,
}: BottomSheetTopElementContainerProps) {
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

  return (
    <View style={styles.container}>
      <Animated.View
        onLayout={handleLayout}
        style={containerAnimatedStyle}
      >
        <BottomSheetFixedTopElement
          animatedPosition={animatedPosition}
          fixedTopElementComponent={fixedTopElementComponent}
        />
        <BottomSheetAnimateTopElement
          animatedAnimationState={animatedAnimationState}
          animatedIndex={animatedIndex}
          animatedPosition={animatedPosition}
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
