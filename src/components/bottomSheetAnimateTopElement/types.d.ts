import type Animated from 'react-native-reanimated';
import type { BottomSheetTopElementContainerProps } from '../bottomSheetTopElementContainer';

export interface BottomSheetAnimateTopElementProps
  extends Pick<
    BottomSheetTopElementContainerProps,
    'animateTopElementBackgroundComponent' | 'animateTopElementComponent'
  > {
  animatedAnimateContainerHeight: Animated.SharedValue<number>;
}
