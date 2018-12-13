import React, { Component } from "react";
import { View } from "react-native";
import TGText from "./TGText";
import styles, { colors } from "../../styles";
type SubHeaderProps = {
  title: any,
  color?: any,
  backgroundColor?: any
};
class SubHeader extends Component<SubHeaderProps, {}> {
  static defaultProps = {
    color: colors.dark,
    backgroundColor: "transparent"
  };
  render() {
    const { title, backgroundColor, color } = this.props;
    return (
      <View style={[styles.subHeader, { backgroundColor }]}>
        <TGText
          adjustsFontSizeToFitHeight
          style={[styles.subHeaderTitle, { color }]}
        >
          {title}
        </TGText>
      </View>
    );
  }
}
export default SubHeader;
