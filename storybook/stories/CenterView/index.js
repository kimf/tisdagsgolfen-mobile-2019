import React from 'react'
import { View } from 'react-native'
import { oneOfType, arrayOf, node } from 'prop-types'

const style = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF'
}

const CenterView = props => (
  <View style={style}>
    {props.children}
  </View>
)

CenterView.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired
}

export default CenterView
