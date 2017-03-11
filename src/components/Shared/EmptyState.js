import React from 'react'
import { View, Image } from 'react-native'

import TGText from 'shared/TGText'

const containerStyle = {
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flex: 1
}

const imageStyle = {
  marginBottom: 40,
  width: '90%',
  height: '60%'
}

const textStyle = {
  fontWeight: 'bold',
  fontSize: 20,
  color: '#5CCD7A'
}

const emptyImage = require('images/emptystate.png')

const EmptyState = ({ text }) =>
  <View style={containerStyle}>
    <Image style={imageStyle} source={emptyImage} />
    <TGText style={textStyle}>{ text }</TGText>
  </View>

EmptyState.propTypes = {
  text: React.PropTypes.string
}

EmptyState.defaultProps = {
  text: '😞 Inget att visa'
}

export default EmptyState
