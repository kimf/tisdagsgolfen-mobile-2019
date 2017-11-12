import React from 'react'
import { StyleSheet } from 'react-native'
import { string, func } from 'prop-types'

import TGText from 'shared/TGText'
import { colors } from 'styles'

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

const RowButton = ({
  title, onPress, backgroundColor, color
}) => (
  <TGText
    viewStyle={[styles.button, { backgroundColor }]}
    style={[styles.text, { color }]}
    onPress={onPress}
  >
    {title}
  </TGText>
)

RowButton.propTypes = {
  backgroundColor: string,
  color: string,
  title: string.isRequired,
  onPress: func.isRequired
}

RowButton.defaultProps = {
  backgroundColor: colors.blue,
  color: colors.white
}

export default RowButton
