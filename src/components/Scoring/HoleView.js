import React, { Component, PropTypes } from 'react'
import { View, Dimensions } from 'react-native'
import Modal from 'react-native-animated-modal'

import ScoreRow from 'Scoring/ScoreRow'
import HoleHeader from 'Scoring/HoleHeader'
import ScorecardHeaderRow from 'Scoring/ScorecardHeaderRow'
import ScoreInput from 'Scoring/ScoreInput'

import { calculateExtraStrokes } from 'utils'

const deviceWidth = Dimensions.get('window').width

const { shape, number, arrayOf, string } = PropTypes

class HoleView extends Component {
  static propTypes = {
    event: shape().isRequired,
    hole: shape().isRequired,
    holesCount: number.isRequired,
    playing: arrayOf(shape()).isRequired,
    scoringSessionId: string.isRequired
  }

  state = { scoring: null }

  toggleScoring = (scoringId) => {
    this.setState((state) => {
      if (state.scoringId) { return { scoringId: null } }
      return { scoringId }
    })
  }

  render() {
    const { event, hole, playing, holesCount, scoringSessionId } = this.props
    const { scoringId } = this.state

    return (
      <View style={{ width: deviceWidth }}>
        <HoleHeader {...hole} />
        <ScorecardHeaderRow teamEvent={event.teamEvent} />

        <View style={{ flexDirection: 'column' }}>
          {
            playing.map((item, index) => {
              const attrWithId = event.teamEvent ? 'scoringTeam' : 'scoringPlayer'
              const liveScore = hole.liveScores.find(ls => ls[attrWithId].id === item.id)
              const itemName = event.teamEvent ? `Lag ${index + 1}` : `${item.user.firstName} ${item.user.lastName.substr(0, 1)}`
              const scoreItem = liveScore || {
                strokes: hole.par,
                putts: 2,
                points: 0,
                beers: 0,
                extraStrokes: calculateExtraStrokes(hole.index, item.strokes, holesCount)
              }

              return (
                <View key={`player_score_row_${item.id}`}>
                  <ScoreRow
                    player={item}
                    hole={hole}
                    scoringType={event.scoringType}
                    teamEvent={event.teamEvent}
                    eventId={event.id}
                    holesCount={holesCount}
                    onStartScoring={this.toggleScoring}
                    scoreItem={scoreItem}
                    itemName={itemName}
                  />
                  <Modal
                    animationIn="fadeInUp"
                    animationInTiming={350}
                    animationOut="fadeOutDown"
                    animationOutTiming={350}
                    backdropColor="black"
                    backdropOpacity={0.85}
                    backdropTransitionInTiming={400}
                    backdropTransitionOutTiming={300}
                    onModalShow={() => { }}
                    onModalHide={() => { }}
                    isVisible={scoringId === item.id}
                  >
                    <ScoreInput
                      scoreItem={scoreItem}
                      itemName={itemName}
                      playerId={item.id}
                      holeId={hole.id}
                      par={hole.par}
                      eventId={event.id}
                      teamEvent={event.teamEvent}
                      onClose={this.toggleScoring}
                      scoringSessionId={scoringSessionId}
                    />
                  </Modal>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}

export default HoleView
