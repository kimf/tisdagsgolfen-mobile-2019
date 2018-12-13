import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../styles'
import TGText from './TGText'
const styles = StyleSheet.create({
  button: {
    padding: 18,
    width: '100%%',
    alignSelf: 'flex-end'
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  }
})
interface BottomButtonProps {
  title: any
  onPress: any
  backgroundColor?: any
  color?: any
}
const BottomButton: React.SFC<BottomButtonProps> = ({ title, onPress, backgroundColor, color }) => (
  <TGText
    viewStyle={[styles.button, { backgroundColor }]}
    style={[styles.text, { color }]}
    onPress={onPress}>
    {title}
  </TGText>
)

export default BottomButton
