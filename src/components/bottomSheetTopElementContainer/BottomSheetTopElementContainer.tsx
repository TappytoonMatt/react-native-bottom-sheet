import React, { memo, useCallback } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { print } from '../../utilities';
import { styles } from './styles';
import type { BottomSheetTopElementContainerProps } from './types';

function BottomSheetTopElementContainerComponent({
  topElementComponent: _providedTopElementComponent,
  topElementHeight,
}: BottomSheetTopElementContainerProps) {
  const topElementContainerLayout = useCallback(
    function handleContainerLayout({
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

  const TopElementComponent = _providedTopElementComponent ?? null;
  return TopElementComponent !== null ? (
    <View style={styles.container}>
      <View onLayout={topElementContainerLayout}>
        <TopElementComponent />
      </View>
    </View>
  ) : null;
}

const BottomSheetTopElementContainer = memo(
  BottomSheetTopElementContainerComponent
);
BottomSheetTopElementContainer.displayName = 'BottomSheetTopElementContainer';

export default BottomSheetTopElementContainer;
