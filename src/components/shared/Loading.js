import React from 'react'
import { View } from 'react-native'
import { string } from 'prop-types'

import TGText from './TGText'
import { colors } from '../../styles'

const containerStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1
}

const textStyle = {
  fontWeight: 'bold',
  fontSize: 24
}

const Loading = ({ text, backgroundColor, color }) => (
  <View style={[containerStyle, { backgroundColor }]}>
    <TGText style={[textStyle, { color }]}>{text}</TGText>
  </View>
)

Loading.propTypes = {
  text: string,
  backgroundColor: string,
  color: string
}

Loading.defaultProps = {
  text: 'Startar upp...',
  backgroundColor: colors.lightGray,
  color: colors.muted
}

export default Loading
