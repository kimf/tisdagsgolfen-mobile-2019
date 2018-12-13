import React, { Component } from "react";
import { View, Image } from "react-native";
import TouchableView from "./TouchableView";
import TGText from "./TGText";
import styles, { colors } from "../../styles";
type HeaderProps = {
  title: any;
  color?: any;
  backgroundColor?: any;
  goBack?: any;
};
class Header extends Component<HeaderProps, {}> {
  static defaultProps = {
    children: null,
    color: colors.dark,
    backgroundColor: colors.lightGray,
    goBack: null,
  };
  renderGoBack = () => (
    <TouchableView
      style={{
        position: "absolute",
        top: 20,
        right: 10,
        padding: 20,
      }}
      onPress={this.props.goBack}>
      <Image style={{ tintColor: colors.muted }} source={require("../../images/close.png")} />
    </TouchableView>
  );
  render() {
    const { title, children, backgroundColor, color, goBack } = this.props;
    return (
      <View style={[styles.navbar, { backgroundColor }]}>
        <View style={[styles.navbarInner, { backgroundColor }]}>
          <TGText adjustsFontSizeToFitHeight style={[styles.navbarTitle, { color }]}>
            {title}
          </TGText>
          {goBack ? this.renderGoBack() : null}
          {children}
        </View>
      </View>
    );
  }
}
export default Header;
