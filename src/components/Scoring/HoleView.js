import React, { Component, PropTypes } from 'react'
import { View, LayoutAnimation } from 'react-native'

import TouchableView from 'shared/TouchableView'
import TGText from 'shared/TGText'
import ScoreRow from 'Scoring/ScoreRow'
import HoleHeader from 'Scoring/HoleHeader'
import ScorecardHeaderRow from 'Scoring/ScorecardHeaderRow'
import ScoreInput from 'Scoring/ScoreInput'

import { calculateExtraStrokes } from 'utils'
import { spring } from 'animations'

const { shape, number, arrayOf, string } = PropTypes

class HoleView extends Component {
  static propTypes = {
    event: shape().isRequired,
    hole: shape().isRequired,
    holesCount: number.isRequired,
    playing: arrayOf(shape()).isRequired,
    scoringSessionId: string.isRequired
  }

  state = { scoringId: null }

  toggleScoring = (scoringId) => {
    LayoutAnimation.configureNext(spring)
    this.setState((state) => {
      if (state.scoringId) { return { scoringId: null } }
      return { scoringId }
    })
  }

  render() {
    const { event, hole, playing, holesCount, scoringSessionId } = this.props
    const { scoringId } = this.state

    return (
      <View style={{ backgroundColor: '#eee' }}>
        <HoleHeader {...hole} />
        <ScorecardHeaderRow teamEvent={event.teamEvent} scoring={scoringId !== null} />
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
              extraStrokes: calculateExtraStrokes(hole.index, item.extraStrokes, holesCount)
            }

            let playerNames = null

            if (event.teamEvent) {
              playerNames = item.users.map(p => (
                <TGText key={`team_player_name_${p.id}`}>
                  {p.firstName} {p.lastName.substr(0, 1)}
                </TGText>
              ))
            }

            return (
              <View
                key={`player_score_row_${item.id}`}
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: '#eee',
                  backgroundColor: (scoringId && scoringId === item.id) ? '#eee' : '#fff'
                }}
              >
                {scoringId && scoringId !== item.id
                  ? null
                  : <View style={{ flex: 2, paddingTop: 20, paddingLeft: 20, paddingBottom: 20 }}>
                    <TGText style={{ fontWeight: 'bold', lineHeight: 30, fontSize: '24' }}>
                      {itemName}
                    </TGText>
                    <TGText style={{ color: '#777' }}>{scoreItem.extraStrokes} slag</TGText>
                    {event.teamEvent ? <TGText>{playerNames}</TGText> : null}
                  </View>
                }

                {scoringId
                  ? null
                  : <TouchableView
                    style={{ flex: 4, paddingVertical: 20, paddingRight: 20 }}
                    onPress={() => this.toggleScoring(item.id)}
                  >
                    <ScoreRow
                      player={item}
                      hole={hole}
                      scoringType={event.scoringType}
                      teamEvent={event.teamEvent}
                      eventId={event.id}
                      holesCount={holesCount}
                      scoreItem={scoreItem}
                      itemName={itemName}
                    />
                  </TouchableView>
                }

                {scoringId !== item.id
                  ? null
                  : <View style={{ flex: 6 }}>
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
                  </View>
                }
              </View>
            )
          })
        }
      </View>
    )
  }
}

export default HoleView
