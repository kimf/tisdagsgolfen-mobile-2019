import React, { PropTypes } from 'react'
import { View, Dimensions } from 'react-native'

import ScoreRow from 'Scoring/ScoreRow'
import HoleHeader from 'Scoring/HoleHeader'
import ScorecardHeaderRow from 'Scoring/ScorecardHeaderRow'

const deviceWidth = Dimensions.get('window').width

const HoleView = ({ event, hole, holesCount, playing }) => (
  <View style={{ width: deviceWidth }}>
    <HoleHeader {...hole} />
    <ScorecardHeaderRow teamEvent={event.teamEvent} />

    <View style={{ flexDirection: 'column' }}>
      {
        playing.map(item => (
          <ScoreRow
            player={item}
            hole={hole}
            holesCount={holesCount}
            scoringType={event.scoringType}
            teamEvent={event.teamEvent}
            eventId={event.id}
            key={`player_score_row_${item.id}`}
          />
        ))
      }
    </View>
  </View>
)

HoleView.propTypes = {
  event: PropTypes.shape().isRequired,
  hole: PropTypes.shape().isRequired,
  holesCount: PropTypes.number.isRequired,
  playing: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default HoleView
