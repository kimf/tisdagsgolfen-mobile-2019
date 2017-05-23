import React from 'react'
import { View, Image } from 'react-native'
import { arrayOf, shape, number } from 'prop-types'

import BottomButton from 'shared/BottomButton'
import HoleHeader from 'Scoring/HoleHeader'
import ScoreRow from 'Scoring/ScoreRow'
import ScorecardHeaderRow from 'Scoring/ScorecardHeaderRow'
import TGText from 'shared/TGText'
import styles, { colors, deviceHeight, deviceWidth } from 'styles'

const defaultAvatar = require('../../images/defaultavatar.png')

const getPhotoUrl = item => (item.photo ? { uri: item.photo.url } : defaultAvatar)

const FinishScoringSession = ({ scrollX, scoringSession, playing }) => (
  <View style={{ flex: 1, backgroundColor: colors.green }}>
    <HoleHeader scrollX={scrollX} par={scoringSession.course.par} index={0} number={19} />
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
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScorecardHeaderRow
            teamEvent={scoringSession.event.teamEvent}
            scoringType={scoringSession.event.scoringType}
            scoring={false}
          />
          {
            playing.map((item, index) => {
              const event = scoringSession.event
              const itemName = event.teamEvent ? `Lag ${index + 1}` : `${item.user.firstName} ${item.user.lastName.substr(0, 1)}`
              const attrWithId = event.teamEvent ? 'scoringTeam' : 'scoringPlayer'

              const liveScores = scoringSession.course.holes.map(h => h.liveScores)
              let strokes = 0
              let putts = 0
              let points = 0
              let beers = 0

              liveScores.forEach((liveScore) => {
                if (liveScore.length > 0) {
                  liveScore.forEach((ls) => {
                    if (ls[attrWithId] && ls[attrWithId].id === item.id) {
                      strokes += ls.strokes
                      putts += ls.putts
                      points += ls.points
                      beers += ls.beers
                    }
                  })
                }
              })

              const scoreItem = { id: item.id, strokes, putts, points, beers }

              let playerNames = null

              if (event.teamEvent) {
                playerNames = item.users.map(p => p.firstName)
              }

              return (
                <View
                  key={`player_score_row_${item.id}`}
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: (index < (playing.length - 1) ? 1 : 0),
                    borderBottomColor: colors.lightGray,
                    backgroundColor: colors.white
                  }}
                >
                  <View style={{ flex: 3, paddingTop: 20, paddingLeft: 20, paddingBottom: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                      {event.teamEvent
                        ? <View style={{ flex: 0, flexDirection: 'row' }}>
                          {item.users.map(user => (
                            <Image
                              key={`team_player_photo_${user.id}`}
                              style={[styles.smallCardImage, { flex: 1 }]}
                              source={getPhotoUrl(user)}
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
                          source={getPhotoUrl(item.user)}
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
                      {item.extraStrokes} extraslag
                    </TGText>
                  </View>

                  <View style={{ flex: 4, paddingVertical: 20, paddingRight: 20 }}>
                    <ScoreRow
                      scoringType={event.scoringType}
                      teamEvent={event.teamEvent}
                      scoreItem={scoreItem}
                    />
                  </View>
                </View>
              )
            })
          }
        </View>
        <BottomButton backgroundColor={colors.blue} title="SPARA RUNDA" onPress={() => null} />
      </View>
    </View>
  </View>
)

FinishScoringSession.propTypes = {
  scoringSession: shape({
    course: shape({
      par: number.isRequired
    }).isRequired
  }).isRequired,
  playing: arrayOf(shape().isRequired).isRequired,
  scrollX: shape().isRequired
}

export default FinishScoringSession
