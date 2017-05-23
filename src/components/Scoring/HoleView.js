import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { shape, number, arrayOf, string } from 'prop-types'

import TouchableView from 'shared/TouchableView'
import TGText from 'shared/TGText'
import ScoreRow from 'Scoring/ScoreRow'
import ScorecardHeaderRow from 'Scoring/ScorecardHeaderRow'
import ScoreInput from 'Scoring/ScoreInput'
import HoleHeader from 'Scoring/HoleHeader'
import styles, { colors, deviceHeight, deviceWidth } from 'styles'
import { calculateExtraStrokes } from 'utils'

const defaultAvatar = require('../../images/defaultavatar.png')

class HoleView extends Component {
  static propTypes = {
    event: shape().isRequired,
    hole: shape().isRequired,
    holesCount: number.isRequired,
    playing: arrayOf(shape()).isRequired,
    scoringSessionId: string.isRequired,
    scrollX: shape().isRequired
  }

  state = { scoringId: null }

  getPhotoUrl = item => (item.photo ? { uri: item.photo.url } : defaultAvatar)

  toggleScoring = (scoringId) => {
    this.setState((state) => {
      if (state.scoringId) { return { scoringId: null } }
      return { scoringId }
    })
  }

  render() {
    const { event, hole, playing, holesCount, scoringSessionId, scrollX } = this.props
    const { scoringId } = this.state

    return (
      <View style={{ flex: 1, backgroundColor: colors.green }}>
        <HoleHeader {...hole} scrollX={scrollX} />
        <View
          style={{
            marginHorizontal: 10,
            height: deviceHeight - 170,
            width: deviceWidth - 20,
            backgroundColor: colors.white,
            borderRadius: 10,
            shadowColor: colors.darkGreen,
            shadowOffset: { width: 5, height: 5 },
            shadowRadius: 1,
            shadowOpacity: 0.5,
            elevation: 5
          }}
        >
          <ScorecardHeaderRow teamEvent={event.teamEvent} scoringType={event.scoringType} scoring={scoringId !== null} />
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
                playerNames = item.users.map(p => p.firstName)
              }

              const isScoring = (scoringId && scoringId === item.id)
              return (
                <View
                  key={`player_score_row_${item.id}`}
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: (index < (playing.length - 1) ? 1 : 0),
                    borderBottomColor: colors.lightGray,
                    backgroundColor: isScoring ? colors.lightGray : colors.white
                  }}
                >
                  {scoringId && scoringId !== item.id
                    ? null
                    : <View style={{ flex: 3, paddingTop: 20, paddingLeft: 20, paddingBottom: 20 }}>
                      <View style={{ flexDirection: 'row' }}>
                        {event.teamEvent
                          ? <View style={{ flex: 0, flexDirection: 'row' }}>
                            {item.users.map(user => (
                              <Image
                                key={`team_player_photo_${user.id}`}
                                style={[styles.smallCardImage, { flex: 1 }]}
                                source={this.getPhotoUrl(user)}
                                resizeMode="cover"
                              />
                            ))}
                          </View>
                          : <Image
                            key={`player_photo_${item.id}`}
                            style={[
                              styles.smallCardImage,
                              { marginBottom: 6, marginRight: 10, marginLeft: 0 }
                            ]}
                            source={this.getPhotoUrl(item.user)}
                            resizeMode="cover"
                          />
                        }
                        <TGText style={{ fontWeight: 'bold', lineHeight: 24, fontSize: 16 }}>
                          {itemName}
                        </TGText>
                      </View>
                      {event.teamEvent
                        ? <TGText style={{ color: colors.muted, fontSize: 12 }}>{playerNames.join(', ')}</TGText>
                        : null
                      }
                      <TGText style={{ color: colors.muted, fontSize: 12 }}>
                        {scoreItem.extraStrokes} extraslag
                      </TGText>
                    </View>
                  }

                  {scoringId
                    ? null
                    : <TouchableView
                      style={{ flex: 4, paddingVertical: 20, paddingRight: 20 }}
                      onPress={() => this.toggleScoring(item.id)}
                    >
                      <ScoreRow
                        scoringType={event.scoringType}
                        teamEvent={event.teamEvent}
                        scoreItem={scoreItem}
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
      </View>
    )
  }
}

export default HoleView
