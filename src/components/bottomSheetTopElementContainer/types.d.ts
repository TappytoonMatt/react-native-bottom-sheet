import type Animated from 'react-native-reanimated';
import type { BottomSheetProps } from '../bottomSheet';

export interface BottomSheetTopElementContainerProps
  extends Pick<
    BottomSheetProps,
    'animatedIndex' | 'animateTopElementComponent' | 'fixedTopElementComponent'
  > {
  animatedAnimationState: Animated.SharedValue<number>;
  topElementHeight: Animated.SharedValue<number>;
}
