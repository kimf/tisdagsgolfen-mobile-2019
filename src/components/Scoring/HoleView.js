import React, { Component, PropTypes } from 'react'
import { View, Dimensions } from 'react-native'
import ScoringScreen from 'Scoring/ScoringScreen'
import ScoreRow from 'Scoring/ScoreRow'

import HoleHeader from 'Scoring/HoleHeader'
import ScorecardHeaderRow from 'Scoring/ScorecardHeaderRow'

const deviceWidth = Dimensions.get('window').width

export default class HoleView extends Component {
  static propTypes = {
    event: PropTypes.shape().isRequired,
    hole: PropTypes.shape().isRequired,
    holesCount: PropTypes.number.isRequired,
    playing: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    saveEventScore: PropTypes.func.isRequired
  }

  state = { scoringItem: null, scoringEventScore: null, extraStrokes: null }

  showScoreForm = (scoringItem, scoringEventScore, extraStrokes) => {
    this.setState({ scoringItem, scoringEventScore, extraStrokes })
  }

  closeScoreForm = (strokes, putts, points) => {
    const { event, hole, saveEventScore } = this.props
    const { scoringItem, extraStrokes } = this.state
    saveEventScore(
      event.id,
      scoringItem.id,
      hole.id,
      strokes,
      putts,
      points,
      hole.par,
      extraStrokes
    )
    this.setState({ scoringItem: null, scoringEventScore: null, extraStrokes: null })
  }

  render() {
    const { event, hole, holesCount, playing, saveEventScore } = this.props
    const { scoringItem, scoringEventScore, extraStrokes } = this.state

    return (
      <View style={{ width: deviceWidth }}>
        <HoleHeader {...hole} />
        <ScorecardHeaderRow teamEvent={event.teamEvent} />

        <View style={{ flexDirection: 'column' }}>
          {
            scoringItem
              ? <ScoringScreen
                closeScoreForm={this.closeScoreForm}
                player={scoringItem}
                eventScore={scoringEventScore}
                eventId={event.id}
                teamEvent={event.teamEvent}
                par={hole.par}
                extraStrokes={extraStrokes}
                key={`player_scoring_screen_${scoringItem.id}`}
              />
              : playing.map((item) => {
                const eventScore = item.eventScores.find(es => es.holeId === hole.id)

                return (
                  <ScoreRow
                    player={item}
                    showScoreForm={this.showScoreForm}
                    hole={hole}
                    eventScore={eventScore}
                    holesCount={holesCount}
                    scoringType={event.scoringType}
                    teamEvent={event.teamEvent}
                    saveEventScore={saveEventScore}
                    key={`player_score_row_${item.id}`}
                  />
                )
              })
          }
        </View>
      </View>
    )
  }
}
