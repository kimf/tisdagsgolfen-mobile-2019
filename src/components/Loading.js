import React from 'react'
import { Text, View, Image } from 'react-native'

const containerStyle = {
  backgroundColor: '#022436',
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
  color: '#fff'
}

const Loading = () => {
  return (
    <View style={containerStyle}>
      <Image style={imageStyle} source={require('../images/logo.png')} />
      <Text style={textStyle}>Startar upp...</Text>
    </View>
  )
}

export default Loading
