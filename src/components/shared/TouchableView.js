import React from 'react'
import { View, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native'
import { object, bool, string, oneOfType, arrayOf, node } from 'prop-types'

import { colors } from '../../styles'

const TouchableView = ({ isRippleDisabled, rippleColor, children, style, ...rest }) => {
  if (Platform.OS === 'android') {
    const background = TouchableNativeFeedback.Ripple(rippleColor, false)
    return (
      <TouchableNativeFeedback {...rest} background={background}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    )
  }

  return (
    <TouchableOpacity {...rest} style={style}>
      {children}
    </TouchableOpacity>
  )
}

TouchableView.propTypes = {
  isRippleDisabled: bool,
  rippleColor: string,
  children: oneOfType([arrayOf(node), node]).isRequired,
  style: object
}

TouchableView.defaultProps = {
  isRippleDisabled: true,
  rippleColor: colors.darkGreen,
  style: null
}

export default TouchableView
