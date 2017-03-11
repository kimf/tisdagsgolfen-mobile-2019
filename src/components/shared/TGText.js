/* eslint-disable react/prop-types */
import React from 'react'
import { StyleSheet, Text, Dimensions } from 'react-native'

import TouchableView from 'shared/TouchableView'

const DEVICE_WIDTH = Dimensions.get('window').width
const FONT_SIZE = 14
const styles = StyleSheet.create({
  text: {
    fontSize: FONT_SIZE,
    fontFamily: 'Avenir'
  }
})

const TGText = ({ onPress, style, viewStyle, children, ...rest }) => {
  const fontSize = style
                   ? (StyleSheet.flatten(style).fontSize || FONT_SIZE)
                   : FONT_SIZE
  const scaledFontSize = Math.round((fontSize * DEVICE_WIDTH) / 375)

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
