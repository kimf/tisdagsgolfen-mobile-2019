import React from 'react'
import { Text, View, Image } from 'react-native'

const containerStyle = {
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'flex-start',
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

const EmptyState = ({text}) => {
  return (
    <View style={containerStyle}>
      <Image style={imageStyle} source={require('../images/emptystate.png')} />
      <Text style={textStyle}>{ text ? text : 'Inget att visa... ännu :('}</Text>
    </View>
  )
}

export default EmptyState
