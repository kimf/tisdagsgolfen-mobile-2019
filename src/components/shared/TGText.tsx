import React from "react";
import { Text } from "react-native-paper";

import TouchableView from "./TouchableView";

interface Props {
  onPress?: () => void;
  style?: any;
  viewStyle?: any;
  children?: any;
  key?: string;
}

const TGText = ({ onPress, style, viewStyle, children, ...rest }: Props) => {
  const text = (
    <Text key={`${rest.key}_inner`} style={style} {...rest}>
      {children}
    </Text>
  );
  return onPress ? (
    <TouchableView key={rest.key} style={viewStyle} onPress={onPress}>
      {text}
    </TouchableView>
  ) : (
    text
  );
};
export default TGText;
