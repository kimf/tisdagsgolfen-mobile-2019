import React from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { colors } from "../../styles";
import TGText from "./TGText";

const containerStyle = {
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
} as ViewStyle;

const textStyle = {
  fontWeight: "bold",
  fontSize: 24,
} as TextStyle;

interface LoadingProps {
  text?: any;
  backgroundColor?: any;
  color?: any;
}

const Loading: React.SFC<LoadingProps> = ({
  text = "Startar upp...",
  backgroundColor = colors.lightGray,
  color = colors.muted,
}) => (
  <View style={[containerStyle, { backgroundColor }]}>
    <TGText style={[textStyle, { color }]}>{text}</TGText>
  </View>
);

export default Loading;
