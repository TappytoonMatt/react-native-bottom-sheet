import type Animated from 'react-native-reanimated';
import type { BottomSheetTopElementContainerProps } from '../bottomSheetTopElementContainer';

export interface BottomSheetAnimateTopElementProps
  extends Pick<
    BottomSheetTopElementContainerProps,
    'animatedAnimationState' | 'animatedIndex' | 'animateTopElementComponent'
  > {
  animatedPosition: Animated.SharedValue<number>;
}
