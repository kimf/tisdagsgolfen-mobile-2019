import React from 'react'
import { View, StyleSheet } from 'react-native'
import { bool, string } from 'prop-types'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const style = StyleSheet.create({
  view: {
    flexDirection: 'row',
    backgroundColor: colors.lightGray,
    paddingHorizontal: 20
  },
  text: {
    color: colors.dark,
    paddingVertical: 10,
    flex: 1,
    textAlign: 'center',
    fontSize: 14
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
      <TGText style={[style.text, { flex: 3, textAlign: 'left', paddingLeft: 0 }]}>SPELARE</TGText>
      <View style={{ flexGrow: 2, flexDirection: 'row' }}>
        {beersHeader}
        <TGText style={style.text}>
          {strokes ? 'BRUTTO' : 'SLAG'}
        </TGText>
        {puttsHeader}
        {scoring
          ? null
          : <TGText style={[style.text, { textAlign: 'right' }]}>
            {strokes ? 'NETTO' : 'POÄNG'}
          </TGText>
        }
      </View>
    </View>
  )
}

ScorecardHeaderRow.propTypes = {
  teamEvent: bool.isRequired,
  scoring: bool.isRequired,
  scoringType: string.isRequired
}

export default ScorecardHeaderRow
