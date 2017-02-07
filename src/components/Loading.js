import React from 'react'
import { Text, View, Image } from 'react-native'

const containerStyle = {
  backgroundColor: '#eee',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
}

const imageStyle = {
  marginBottom: 40
}

const textStyle = {
  fontWeight: 'bold',
  fontSize: 24,
  color: '#ccc'
}

const Loading = ({text}) => {
  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{ text ? text : 'Startar upp...'}</Text>
    </View>
  )
}

export default Loading
