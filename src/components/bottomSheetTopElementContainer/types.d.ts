import type Animated from 'react-native-reanimated';
import type { BottomSheetProps } from '../bottomSheet';

export interface BottomSheetTopElementContainerProps
  extends Pick<BottomSheetProps, 'topElementComponent'> {
  topElementHeight: Animated.SharedValue<number>;
}
