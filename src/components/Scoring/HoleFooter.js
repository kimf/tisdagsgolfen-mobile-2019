import React from 'react'
import { View, StyleSheet } from 'react-native'

import TGText from 'shared/TGText'

const styles = StyleSheet.create({
  view: {
    height: 44,
    backgroundColor: 'transparent',
    width: '100%',
    paddingTop: 10
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: '#363',
    fontWeight: 'bold'
  }
})
const HoleFooter = () => (
  <View style={styles.view}>
    <TGText style={styles.text}>
      LEDARTAVLA
  </TGText>
  </View>
)

// const { number, func } = PropTypes
HoleFooter.propTypes = {}

export default HoleFooter
