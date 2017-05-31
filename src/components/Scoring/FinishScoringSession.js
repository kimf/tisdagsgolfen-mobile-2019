import React from 'react'
import { Alert, View } from 'react-native'
import { arrayOf, func, shape, number } from 'prop-types'

import BottomButton from 'shared/BottomButton'
import TGText from 'shared/TGText'
import HoleHeader from 'Scoring/HoleHeader'
import ScoreRow from 'Scoring/ScoreRow'
import UserColumn from 'Scoring/UserColumn'
import ScorecardHeaderRow from 'Scoring/ScorecardHeaderRow'
import { colors, deviceHeight, deviceWidth } from 'styles'

const confirmFinish = (finishFunc) => {
  Alert.alert(
    'Vill du verkligen spara och stänga??',
    'Har du verkligen dubbelkollat?',
    [
      { text: 'Cancel', onPress: () => null, style: 'cancel' },
      { text: 'OK', onPress: () => finishFunc() }
    ],
    { cancelable: false }
  )
}


const FinishScoringSession = ({ scrollX, scoringSession, playing, finishRound }) => (
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

              const scoreItem = {
                id: item.id,
                strokes,
                putts,
                points,
                beers,
                extraStrokes: item.extraStrokes
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
                  <UserColumn
                    teamEvent={event.teamEvent}
                    item={item}
                    scoreItem={scoreItem}
                  />

                  <View style={{ flexGrow: 2, paddingVertical: 20, paddingRight: 20 }}>
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
        <TGText style={{ textAlign: 'center', padding: 20, color: colors.red }}>
          Dubbelkolla så att allt ser rätt ut!
        </TGText>
        <BottomButton
          backgroundColor={colors.red}
          title="SPARA RUNDA"
          onPress={() => confirmFinish(finishRound)}
        />
      </View>
    </View>
  </View>
)

FinishScoringSession.propTypes = {
  finishRound: func.isRequired,
  scoringSession: shape({
    course: shape({
      par: number.isRequired
    }).isRequired
  }).isRequired,
  playing: arrayOf(shape().isRequired).isRequired,
  scrollX: shape().isRequired
}

export default FinishScoringSession
