import React, { ReactChild, ReactChildren, ReactElement } from "react";
import { RegisteredStyle, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import { colors, deviceHeight, deviceWidth } from "../../styles";
import TouchableView from "./TouchableView";
const realWidth = deviceHeight > deviceWidth ? deviceWidth : deviceHeight;
const FONT_SIZE = 16;
const styles = StyleSheet.create({
  text: {
    color: colors.dark,
    fontFamily: "System",
    fontSize: FONT_SIZE,
    fontWeight: "300",
  },
});

interface Props {
  onPress?: () => void;
  style?: any;
  viewStyle?: any;
  children?: any;
  key?: string;
}

const TGText = ({ onPress, style, viewStyle, children, ...rest }: Props) => {
  // @ts-ignore
  const fontSize = style ? StyleSheet.flatten(style).fontSize || FONT_SIZE : FONT_SIZE;
  const scaledFontSize = Math.round((fontSize * realWidth) / 375);
  const text = (
    <Text
      key={`${rest.key}_inner`}
      style={[styles.text, style, { fontSize: scaledFontSize }]}
      {...rest}>
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
