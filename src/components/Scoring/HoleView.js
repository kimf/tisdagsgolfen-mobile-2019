import React, { PropTypes } from 'react'
import { View, Dimensions } from 'react-native'

import ScoreRow from 'Scoring/ScoreRow'
import HoleHeader from 'Scoring/HoleHeader'
import ScorecardHeaderRow from 'Scoring/ScorecardHeaderRow'
import { calculateExtraStrokes } from 'utils'

const deviceWidth = Dimensions.get('window').width

const HoleView = ({ event, hole, playing, holesCount, onStartScoring }) => (
  <View style={{ width: deviceWidth }}>
    <HoleHeader {...hole} />
    <ScorecardHeaderRow teamEvent={event.teamEvent} />

    <View style={{ flexDirection: 'column' }}>
      {
        playing.map((item) => {
          const liveScore = hole.liveScores.find(ls => ls.user.id === item.id)

          const scoreItem = liveScore || {
            strokes: hole.par,
            putts: 2,
            points: 0,
            beers: 0,
            extraStrokes: calculateExtraStrokes(hole.index, item.strokes, holesCount)
          }

          return (
            <ScoreRow
              key={`player_score_row_${item.id}`}
              player={item}
              hole={hole}
              scoringType={event.scoringType}
              teamEvent={event.teamEvent}
              eventId={event.id}
              holesCount={holesCount}
              onStartScoring={onStartScoring}
              scoreItem={scoreItem}
            />
          )
        })
      }
    </View>
  </View>
)

HoleView.propTypes = {
  event: PropTypes.shape().isRequired,
  hole: PropTypes.shape().isRequired,
  holesCount: PropTypes.number.isRequired,
  playing: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onStartScoring: PropTypes.func.isRequired
}

export default HoleView
