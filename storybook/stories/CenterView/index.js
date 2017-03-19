import React from 'react'
import { View } from 'react-native'

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

const { oneOfType, arrayOf, node } = React.PropTypes
CenterView.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired
}

export default CenterView
