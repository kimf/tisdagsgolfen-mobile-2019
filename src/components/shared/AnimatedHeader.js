import React, { Component } from 'react'
import { View, Animated } from 'react-native'
import { shape, string, oneOfType, arrayOf, node } from 'prop-types'

import styles, { NAVBAR_HEIGHT } from '../../styles'

const HEADER_SCROLL_DISTANCE = NAVBAR_HEIGHT - 60

class AnimatedHeader extends Component {
  static propTypes = {
    scrollY: shape(),
    title: string.isRequired,
    children: oneOfType([arrayOf(node), node])
  }

  static defaultProps = {
    scrollY: null,
    children: null
  }

  render() {
    const { scrollY, title, children } = this.props

    const navbarTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -30],
      extrapolate: 'clamp'
    })

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.7],
      extrapolate: 'clamp'
    })

    const titleX = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -40],
      extrapolate: 'clamp'
    })

    return (
      <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
        <View style={styles.navbarInner}>
          <Animated.Text
            adjustsFontSizeToFitHeight
            style={[
              styles.navbarTitle,
              {
                transform: [{ scale: titleScale }, { translateX: titleX }]
              }
            ]}>
            {title}
          </Animated.Text>
          {children}
        </View>
      </Animated.View>
    )
  }
}

export default AnimatedHeader
