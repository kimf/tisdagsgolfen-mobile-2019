import React, { Component } from 'react'
import { Animated, Easing } from 'react-native'

import TGText from './TGText'

const LOW_VAL = 0.25

class AnimatedText extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(LOW_VAL)
    }
  }

  componentDidMount() {
    this.animate(1)
  }

  animate = toValue => {
    Animated.timing(this.state.fadeAnim, {
      toValue,
      duration: 1500,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true
    }).start(() => {
      this.animate(toValue !== 1 ? 1 : LOW_VAL)
    })
  }

  render() {
    return (
      <Animated.View style={[{ opacity: this.state.fadeAnim }]}>
        <TGText {...this.props} />
      </Animated.View>
    )
  }
}

export default AnimatedText
