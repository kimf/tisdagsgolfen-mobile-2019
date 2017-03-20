import React from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'

const containerStyle = {
  backgroundColor: '#eee',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1
}

const textStyle = {
  fontWeight: 'bold',
  fontSize: 24,
  color: '#ccc'
}

const Loading = ({ text }) =>
  <View style={containerStyle}>
    <TGText style={textStyle}>{ text }</TGText>
  </View>


Loading.propTypes = {
  text: React.PropTypes.string
}

Loading.defaultProps = {
  text: 'Startar upp...'
}

export default Loading
