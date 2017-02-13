import React from 'react'
import { Text, View, Image } from 'react-native'

const containerStyle = {
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flex: 1
}

const imageStyle = {
  marginBottom: 40
}

const textStyle = {
  fontWeight: 'bold',
  fontSize: 24,
  color: '#ccc'
}

const emptyImage = require('../../images/emptystate.png')

const EmptyState = ({ text }) =>
  <View style={containerStyle}>
    <Image style={imageStyle} source={emptyImage} />
    <Text style={textStyle}>{ text }</Text>
  </View>

EmptyState.propTypes = {
  text: React.PropTypes.string
}

EmptyState.defaultProps = {
  text: 'Inget att visa... ännu :('
}

export default EmptyState
