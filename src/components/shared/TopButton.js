import React from 'react'
import { StyleSheet } from 'react-native'
import { string, func } from 'prop-types'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.yellow,
    padding: 16,
    width: '100%',
    alignSelf: 'flex-end'
  },

  text: {
    color: colors.dark,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12
  }
})

const TopButton = ({ title, onPress }) => (
  <TGText
    viewStyle={styles.button}
    style={styles.text}
    onPress={onPress}
  >
    {title}
  </TGText>
)

TopButton.propTypes = {
  title: string.isRequired,
  onPress: func.isRequired
}

export default TopButton
