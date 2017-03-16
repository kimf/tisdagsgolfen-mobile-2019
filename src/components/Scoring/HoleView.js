import React, { Component, PropTypes } from 'react'
import { View, Dimensions } from 'react-native'

import ScoreRow from 'Scoring/ScoreRow'
import HoleHeader from 'Scoring/HoleHeader'
import ScorecardHeaderRow from 'Scoring/ScorecardHeaderRow'

const deviceWidth = Dimensions.get('window').width

const HoleView = ({ event, hole, playing, holesCount, onStartScoring }) => (
  <View style={{ width: deviceWidth }}>
    <HoleHeader {...hole} />
    <ScorecardHeaderRow teamEvent={event.teamEvent} />

    <View style={{ flexDirection: 'column' }}>
      {
        playing.map(item => (
          <ScoreRow
            key={`player_score_row_${item.id}`}
            player={item}
            hole={hole}
            scoringType={event.scoringType}
            teamEvent={event.teamEvent}
            eventId={event.id}
            holesCount={holesCount}
            onStartScoring={onStartScoring}
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
  playing: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onStartScoring: PropTypes.func.isRequired
}

export default HoleView
