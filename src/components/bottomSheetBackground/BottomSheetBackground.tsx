import React, { memo } from 'react';
import { View } from 'react-native';
import type { BottomSheetBackgroundProps } from './types';
import { styles } from './styles';

const BottomSheetBackgroundComponent = ({
  pointerEvents,
  style,
}: BottomSheetBackgroundProps) => (
  // @ts-expect-error Server Component
  <View
    pointerEvents={pointerEvents}
    accessible={true}
    accessibilityRole="adjustable"
    accessibilityLabel="Bottom Sheet"
    style={[styles.container, style]}
  />
);

const BottomSheetBackground = memo(BottomSheetBackgroundComponent);
BottomSheetBackground.displayName = 'BottomSheetBackground';

export default BottomSheetBackground;
