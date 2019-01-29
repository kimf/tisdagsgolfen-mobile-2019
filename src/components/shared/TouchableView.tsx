import React from "react";
import { Platform, TouchableOpacity, View, ViewStyle } from "react-native";
import { TouchableRipple } from "react-native-paper";

import { colors } from "../../styles";

interface TouchableViewProps {
  rippleColor?: string;
  style: ViewStyle;
  onPress: () => void;
  children: JSX.Element[] | JSX.Element;
}

const TouchableView: React.SFC<TouchableViewProps> = ({
  rippleColor = colors.darkGreen,
  children,
  style,
  ...rest
}) => {
  if (Platform.OS === "android") {
    return (
      <TouchableRipple {...rest} rippleColor={rippleColor}>
        <View style={style}>{children}</View>
      </TouchableRipple>
    );
  }
  return (
    <TouchableOpacity {...rest} style={style}>
      {children}
    </TouchableOpacity>
  );
};

export default TouchableView;
