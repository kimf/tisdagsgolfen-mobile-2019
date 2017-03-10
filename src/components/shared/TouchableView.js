import React, { PropTypes } from 'react'
import { View, TouchableNativeFeedback, TouchableOpacity } from 'react-native'

const TouchableView = ({ isRippleDisabled, rippleColor, children, style, ...rest }) => {
  if (!isRippleDisabled) {
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
  isRippleDisabled: PropTypes.bool,
  rippleColor: PropTypes.string,
  children: PropTypes.element.isRequired,
  style: PropTypes.shape()
}

TouchableView.defaultProps = {
  isRippleDisabled: true,
  rippleColor: '#c00',
  style: {}
}

export default TouchableView
