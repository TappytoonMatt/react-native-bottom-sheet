import React, { memo } from 'react';
import { View } from 'react-native';
import type { BottomSheetAnimateTopElementBackgroundProps } from './types';

function BottomSheetAnimateTopElementBackgroundComponent({
  children,
  style,
}: BottomSheetAnimateTopElementBackgroundProps) {
  // @ts-expect-error Server Component
  return <View style={style}>{children}</View>;
}

const BottomSheetAnimateTopElementBackground = memo(
  BottomSheetAnimateTopElementBackgroundComponent
);
BottomSheetAnimateTopElementBackground.displayName =
  'BottomSheetAnimateTopElementBackground';

export default BottomSheetAnimateTopElementBackground;
