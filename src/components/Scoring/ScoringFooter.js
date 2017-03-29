import React, { PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const styles = StyleSheet.create({
  view: {
    height: 44,
    backgroundColor: colors.green,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  button: {
    flex: 1,
    padding: 20
  },
  text: {
    color: colors.darkGreen,
    fontWeight: 'bold'
  },
  menu: {
    textAlign: 'left'
  },
  leaderboard: {
    textAlign: 'right'
  }
})

const ScoringFooter = ({ showMenu, showLeaderboard }) => (
  <View style={styles.view}>
    <TGText
      onPress={() => showMenu()}
      viewStyle={styles.button}
      style={[styles.text, styles.menu]}
    >
      MENY
    </TGText>
    <TGText
      onPress={() => showLeaderboard()}
      viewStyle={styles.button}
      style={[styles.text, styles.leaderboard]}
    >
      LEDARTAVLA
    </TGText>
  </View>
)

const { func } = PropTypes
ScoringFooter.propTypes = {
  showMenu: func.isRequired,
  showLeaderboard: func.isRequired
}

export default ScoringFooter
