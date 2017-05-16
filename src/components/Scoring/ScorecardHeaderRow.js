import React from 'react'
import { View, StyleSheet } from 'react-native'
import { bool, string } from 'prop-types'

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

const ScorecardHeaderRow = ({ teamEvent, scoring, scoringType }) => {
  const puttsHeader = teamEvent ? null : (
    <TGText style={style.text}>PUTT</TGText>
  )
  const beersHeader = teamEvent ? null : (
    <TGText style={style.text}>ÖL</TGText>
  )
  const strokes = scoringType === 'strokes'
  return (
    <View style={style.view}>
      <TGText style={[style.text, { flex: 3 }]}>SPELARE</TGText>
      {beersHeader}
      <TGText style={style.text}>
        {strokes ? 'POÄNG' : 'SLAG'}
      </TGText>
      {puttsHeader}
      {scoring
        ? null
        : <TGText style={[style.text, { textAlign: 'center' }]}>
          {strokes ? 'SLAG' : 'POÄNG'}
        </TGText>
      }
    </View>
  )
}

ScorecardHeaderRow.propTypes = {
  teamEvent: bool.isRequired,
  scoring: bool.isRequired,
  scoringType: string.isRequired
}

export default ScorecardHeaderRow
