import React from 'react'
import { View, Image } from 'react-native'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const containerStyle = {
  backgroundColor: colors.white,
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1
}

const imageStyle = {
  width: '90%',
  height: '60%'
}

const textStyle = {
  fontWeight: 'bold',
  fontSize: 24,
  color: colors.muted
}

const emptyImage = require('images/emptystate.png')

const EmptyState = ({ text }) =>
  <View style={containerStyle}>
    <Image style={imageStyle} source={emptyImage} />
    <TGText style={textStyle}>{text}</TGText>
  </View>

EmptyState.propTypes = {
  text: React.PropTypes.string
}

EmptyState.defaultProps = {
  text: '😞 Inget att visa'
}

export default EmptyState
