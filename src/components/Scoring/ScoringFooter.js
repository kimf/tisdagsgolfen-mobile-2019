import React, { PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'

import TGText from 'shared/TGText'

const styles = StyleSheet.create({
  view: {
    height: 44,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  button: {
    flex: 1
  },
  text: {
    color: '#229553',
    fontWeight: 'bold'
  },
  menu: {
    textAlign: 'left'
  },
  leaderboard: {
    textAlign: 'right'
  }
})

const ScoringFooter = ({ gotoMenu, gotoLeaderboard }) => (
  <View style={styles.view}>
    <TGText
      onPress={() => gotoMenu()}
      viewStyle={styles.button}
      style={[styles.text, styles.menu]}
    >
      MENY
    </TGText>
    <TGText
      onPress={() => gotoLeaderboard()}
      viewStyle={styles.button}
      style={[styles.text, styles.leaderboard]}
    >
      LEDARTAVLA
    </TGText>
  </View>
)

const { func } = PropTypes
ScoringFooter.propTypes = {
  gotoMenu: func.isRequired,
  gotoLeaderboard: func.isRequired
}

export default ScoringFooter
