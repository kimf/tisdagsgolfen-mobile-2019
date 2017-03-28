// TODO: Refactor and dry this up! (Maybe make a special TeamScoreRow to remove ifs)
import React, { PropTypes } from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'
import ScoreItemText from 'Scoring/ScoreItemText'
import { colors } from 'styles'

const { bool, shape } = PropTypes

const ScoreRow = ({ teamEvent, scoreItem }) => (
  <View style={{ flexDirection: 'row' }}>
    {teamEvent || !scoreItem.id ? null : <ScoreItemText dimmed title={scoreItem.beers} />}
    {scoreItem.id ? <ScoreItemText title={scoreItem.strokes} /> : null}
    {teamEvent || !scoreItem.id ? null : <ScoreItemText title={scoreItem.putts} />}
    {scoreItem.id ? <ScoreItemText fontSize="28" fontWeight="bold" textAlign="center" title={scoreItem.points} /> : null}
    {!scoreItem.id
      ? <TGText style={{ color: colors.muted, paddingLeft: 80 }}>SÄTT RESULTAT</TGText>
      : null
    }
  </View>
)

ScoreRow.propTypes = {
  teamEvent: bool.isRequired,
  scoreItem: shape().isRequired
}

export default ScoreRow
