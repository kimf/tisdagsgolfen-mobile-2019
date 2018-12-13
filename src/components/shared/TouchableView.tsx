import React, { ReactElement } from "react";
import {
  Platform,
  RegisteredStyle,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../styles";
interface TouchableViewProps {
  isRippleDisabled?: boolean;
  rippleColor?: string;
  style: RegisteredStyle<ViewStyle>;
  onPress: () => void;
  children: ReactElement;
}
const TouchableView: React.SFC<TouchableViewProps> = ({
  isRippleDisabled = true,
  rippleColor = colors.darkGreen,
  children,
  style,
  ...rest
}) => {
  if (Platform.OS === "android") {
    const background = TouchableNativeFeedback.Ripple(rippleColor, false);
    return (
      <TouchableNativeFeedback {...rest} background={background}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableOpacity {...rest} style={style}>
      {children}
    </TouchableOpacity>
  );
};

export default TouchableView;
