// TODO: Refactor and dry this up! (Maybe make a special TeamScoreRow to remove ifs)
import React from 'react'
import { View } from 'react-native'
import { bool, shape, string } from 'prop-types'

import TGText from 'shared/TGText'
import ScoreItemText from 'Scoring/ScoreItemText'
import { colors } from 'styles'

const ScoreRow = ({ teamEvent, scoreItem, scoringType }) => {
  const strokes = scoringType === 'strokes'
  return (
    <View style={{ flexDirection: 'row' }}>
      {teamEvent || !scoreItem.id ? null : <ScoreItemText dimmed title={scoreItem.beers} />}
      {scoreItem.id
        ? <ScoreItemText title={strokes ? scoreItem.points : scoreItem.strokes} />
        : null
      }
      {teamEvent || !scoreItem.id ? null : <ScoreItemText title={scoreItem.putts} />}
      {scoreItem.id
        ? <ScoreItemText
          fontSize="28"
          fontWeight="bold"
          textAlign="center"
          title={strokes ? scoreItem.strokes : scoreItem.points}
        />
        : <TGText style={{ color: colors.red, paddingLeft: 80, paddingTop: 10 }}>
          TRYCK HÄR
        </TGText>
      }
    </View>
  )
}

ScoreRow.propTypes = {
  teamEvent: bool.isRequired,
  scoreItem: shape().isRequired,
  scoringType: string.isRequired
}

export default ScoreRow
