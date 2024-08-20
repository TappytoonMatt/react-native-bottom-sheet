import React, { memo, PropsWithChildren } from 'react';
import { View } from 'react-native';
import { styles } from './styles';

function BottomSheetAnimateTopElementBackgroundComponent({
  children,
}: PropsWithChildren<{}>) {
  return <View style={styles.container}>{children}</View>;
}

const BottomSheetAnimateTopElementBackground = memo(
  BottomSheetAnimateTopElementBackgroundComponent
);
BottomSheetAnimateTopElementBackground.displayName =
  'BottomSheetAnimateTopElementBackground';

export default BottomSheetAnimateTopElementBackground;
