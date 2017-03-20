import React, { PropTypes } from 'react'
import { View, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native'

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
  isRippleDisabled: PropTypes.bool,
  rippleColor: PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]).isRequired,
  style: View.propTypes.style
}

TouchableView.defaultProps = {
  isRippleDisabled: true,
  rippleColor: '#c00',
  style: {}
}

export default TouchableView
