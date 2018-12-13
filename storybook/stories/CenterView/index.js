import React from 'react'
import { View } from 'react-native'

const style = {
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
  flex: 1,
  justifyContent: 'center'
}

const CenterView = props => <View style={style}>{props.children}</View>

export default CenterView
