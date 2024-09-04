# bottom-sheet-with-top-element

This is a custom version of the `@gorhom/bottom-sheet` library with additional features and modifications.

## Original Library

This package is based on [`@gorhom/bottom-sheet`](https://github.com/gorhom/react-native-bottom-sheet).

## Modifications

- Added Fixed top element.
- Added Animate top element.
- Apply Animate top element background.

## Preview
<img src="https://github.com/user-attachments/assets/cc754f3d-81ec-4388-a164-71ced1899217" width="400" height="550" alt="preview">

## Installation

```bash
npm install bottom-sheet-with-top-element
```
or
```bash
yarn add bottom-sheet-with-top-element
```

## Added Props
| Props                                | Description                                                                        | Optional | Type                                                 |
|--------------------------------------|------------------------------------------------------------------------------------|----------|------------------------------------------------------|
| animateTopElementComponent           | Elements that stay fixed at the top regardless of animations                       | true     | React.FC                                             |
| animateTopElementBackgroundComponent | Element that automatically appears when the bottom sheet animation ends            | true     | React.FC                                             |
| fixedTopElementComponent             | Element that will serve as the background for animateTopElementBackgroundComponent | true     | React.FC<PropsWithChildren<Pick<ViewProps, 'style'>> |

## Example
```bash
import { Text, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

export default function Example() {
    const animateTopElementBackgroundComponent = ({ children, style }) => (
      <View
        style={{
          ...style,
          backgroundColor: 'blue',
          height: 70,
          width: '100%',
        }}
      >
        {children}
      </View>
    );

    const animateTopElementComponent = () => (
      <View style={{ paddingVertical: 16, paddingHorizontal: 12 }}>
        <Text>This is animate top element.</Text>
      </View>
    );

    const fixedTopElementComponent = () => (
      <View
        style={{
          backgroundColor: 'red',
          height: 50,
          width: '100%',
        }}
      />
    );

    return (
      <BottomSheet
        {...otherProps}
        animateTopElementBackgroundComponent={animateTopElementBackgroundComponent}
        animateTopElementComponent={animateTopElementComponent}
        fixedTopElementComponent={fixedTopElementComponent}
      />
    );
}
```

## License

This project is licensed under the MIT License.

The original `@gorhom/bottom-sheet` library is also licensed under the MIT License.
