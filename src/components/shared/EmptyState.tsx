import React from 'react'
import { Image, View } from 'react-native'
import { colors } from '../../styles'
import TGText from './TGText'
const containerStyle = {
  backgroundColor: colors.white,
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1
}
const imageStyle = {
  width: '90%',
  height: '60%'
}
const textStyle = {
  fontWeight: 'bold',
  fontSize: 24,
  color: colors.muted
}
const emptyImage = require('../../images/emptystate.png')
interface EmptyStateProps {
  text?: any
}
const EmptyState: React.SFC<EmptyStateProps> = ({ text = '😞 Inget att visa' }) => (
  <View style={containerStyle}>
    <Image style={imageStyle} source={emptyImage} />
    <TGText style={textStyle}>{text}</TGText>
  </View>
)

export default EmptyState
