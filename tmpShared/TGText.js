/* eslint-disable react/prop-types */
import React from 'react'
import { StyleSheet, Text, Dimensions } from 'react-native'

import TouchableView from 'shared/TouchableView'

const { width, height } = Dimensions.get('window')
const realWidth = height > width ? width : height
const FONT_SIZE = 16
const styles = StyleSheet.create({
  text: {
    fontSize: FONT_SIZE,
    fontFamily: 'Akrobat',
    fontWeight: '300'
  }
})

const TGText = ({ onPress, style, viewStyle, children, ...rest }) => {
  const fontSize = style
    ? (StyleSheet.flatten(style).fontSize || FONT_SIZE)
    : FONT_SIZE
  const scaledFontSize = Math.round((fontSize * realWidth) / 375)

  const text = (
    <Text style={[styles.text, style, { fontSize: scaledFontSize }]} {...rest}>
      {children}
    </Text>
  )
  return onPress
    ? <TouchableView style={viewStyle} onPress={onPress}>{text}</TouchableView>
    : text
}

export default TGText
/* eslint-enable react/prop-types */
