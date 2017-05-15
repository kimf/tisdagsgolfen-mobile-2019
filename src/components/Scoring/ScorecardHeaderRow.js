import React, { PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const style = StyleSheet.create({
  view: {
    flexDirection: 'row',
    backgroundColor: colors.yellow,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  text: {
    color: colors.muted,
    paddingVertical: 10,
    flex: 1,
    textAlign: 'left',
    fontSize: 12
  }
})

const ScorecardHeaderRow = ({ teamEvent, scoring }) => {
  const puttsHeader = teamEvent ? null : (
    <TGText style={style.text}>PUTT</TGText>
  )
  const beersHeader = teamEvent ? null : (
    <TGText style={style.text}>ÖL</TGText>
  )
  return (
    <View style={style.view}>
      <TGText style={[style.text, { flex: 3 }]}>SPELARE</TGText>
      {beersHeader}
      <TGText style={style.text}>SLAG</TGText>
      {puttsHeader}
      {scoring ? null : <TGText style={[style.text, { textAlign: 'center' }]}>POÄNG</TGText>}
    </View>
  )
}

ScorecardHeaderRow.propTypes = {
  teamEvent: PropTypes.bool.isRequired,
  scoring: PropTypes.bool.isRequired
}

export default ScorecardHeaderRow
