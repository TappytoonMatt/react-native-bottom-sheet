import type Animated from 'react-native-reanimated';
import type { BottomSheetTopElementContainerProps } from '../bottomSheetTopElementContainer';

export interface BottomSheetFixedTopElementProps
  extends Pick<
    BottomSheetTopElementContainerProps,
    'fixedTopElementComponent'
  > {
  animatedPosition: Animated.SharedValue<number>;
}
