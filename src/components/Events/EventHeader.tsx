import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../styles'
import TGText from '../shared/TGText'
const gametypeName = scoringType => {
  switch (scoringType) {
    case 'modified_points':
      return 'Modifierad Poäng'
    case 'points':
      return 'Poäng'
    default:
      return 'Slaggolf'
  }
}
const styles = StyleSheet.create({
  view: {
    flex: 2,
    padding: 10,
    height: 70,
    backgroundColor: colors.lightGray,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  text: {
    textAlign: 'left',
    flex: 1,
    color: colors.semiDark,
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 18
  }
})
interface EventHeaderProps {
  course: any
  teamEvent: any
  scoringType: any
}
const EventHeader: React.SFC<EventHeaderProps> = ({ course, teamEvent, scoringType }) => (
  <View style={styles.view}>
    <TGText style={styles.text}>
      {gametypeName(scoringType)}
      {teamEvent ? ', Lagtävling ' : ', Individuellt'}
    </TGText>
    <TGText style={[styles.text, { color: colors.gray, fontSize: 14 }]}>{course.club}</TGText>
    <TGText style={[styles.text, { color: colors.darkGreen, fontSize: 14 }]}>{course.name}</TGText>
  </View>
)
export default EventHeader
