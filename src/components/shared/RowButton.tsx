import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../styles'
import TGText from './TGText'
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    width: '48%'
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  }
})
interface RowButtonProps {
  backgroundColor?: any
  color?: any
  title: any
  onPress: any
}
const RowButton: React.SFC<RowButtonProps> = ({
  title,
  onPress,
  backgroundColor = colors.blue,
  color = colors.white
}) => (
  <TGText
    viewStyle={[styles.button, { backgroundColor }]}
    style={[styles.text, { color }]}
    onPress={onPress}>
    {title}
  </TGText>
)

export default RowButton
