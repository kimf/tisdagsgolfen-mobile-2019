import React from 'react'
import { Alert, View } from 'react-native'

import { colors, deviceHeight, deviceWidth } from '../../styles'
import BottomButton from '../shared/BottomButton'
import TGText from '../shared/TGText'
import HoleHeader from './HoleHeader'
import ScorecardHeaderRow from './ScorecardHeaderRow'
import ScoreRow from './ScoreRow'
import UserColumn from './UserColumn'

const confirmFinish = finishFunc => {
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
      }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScorecardHeaderRow
            teamEvent={scoringSession.teamEvent}
            scoringType={scoringSession.scoringType}
            scoring={false}
          />
          {playing.map((item, index) => {
            let strokes = 0
            let putts = 0
            let points = 0
            let beers = 0
            const userId = scoringSession.teamEvent ? index : item.users[0].id

            scoringSession.liveScores.forEach(ls => {
              if (ls.user.id === userId) {
                strokes += ls.strokes
                putts += ls.putts
                points += ls.points
                beers += ls.beers
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
                key={`player_score_row_${userId}`}
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: index < playing.length - 1 ? 1 : 0,
                  borderBottomColor: colors.lightGray,
                  backgroundColor: colors.white
                }}>
                <UserColumn
                  teamEvent={scoringSession.teamEvent}
                  item={item}
                  scoreItem={scoreItem}
                />

                <View style={{ flexGrow: 2, paddingVertical: 20, paddingRight: 20 }}>
                  <ScoreRow
                    scoringType={scoringSession.scoringType}
                    teamEvent={scoringSession.teamEvent}
                    scoreItem={scoreItem}
                  />
                </View>
              </View>
            )
          })}
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

export default FinishScoringSession
