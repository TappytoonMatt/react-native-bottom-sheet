import type Animated from 'react-native-reanimated';
import type { BottomSheetTopElementContainerProps } from '../bottomSheetTopElementContainer';

export interface BottomSheetFixedTopElementProps
  extends Pick<
    BottomSheetTopElementContainerProps,
    'fixedTopElementComponent'
  > {
  animatedFixedContainerHeight: Animated.SharedValue<number>;
}
