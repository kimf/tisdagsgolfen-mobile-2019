import React, { Component, ReactChildren } from "react";
import { Animated, View } from "react-native";

import styles, { NAVBAR_HEIGHT } from "../../styles";

const HEADER_SCROLL_DISTANCE = NAVBAR_HEIGHT - 60;

interface Props {
  scrollY: Animated.Value;
  title: string;
  children: ReactChildren;
}

class AnimatedHeader extends Component<Props> {
  public render() {
    const { scrollY, title, children } = this.props;

    const navbarTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -30],
      extrapolate: "clamp",
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.7],
      extrapolate: "clamp",
    });

    const titleX = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -40],
      extrapolate: "clamp",
    });

    return (
      <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
        <View style={styles.navbarInner}>
          <Animated.Text
            adjustsFontSizeToFitHeight={true}
            style={[
              styles.navbarTitle,
              {
                transform: [{ scale: titleScale }, { translateX: titleX }],
              },
            ]}>
            {title}
          </Animated.Text>
          {children}
        </View>
      </Animated.View>
    );
  }
}

export default AnimatedHeader;
