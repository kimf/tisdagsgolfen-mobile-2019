import React from 'react'
import { View, StyleSheet } from 'react-native'
import { string, bool } from 'prop-types'

import TGText from '../shared/TGText'
import { colors } from '../../styles'
import { courseShape } from '../../propTypes'

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

const EventHeader = ({ course, teamEvent, scoringType }) => (
  <View style={styles.view}>
    <TGText style={styles.text}>
      {gametypeName(scoringType)}
      {teamEvent ? ', Lagtävling ' : ', Individuellt'}
    </TGText>
    <TGText style={[styles.text, { color: colors.gray, fontSize: 14 }]}>{course.club}</TGText>
    <TGText style={[styles.text, { color: colors.darkGreen, fontSize: 14 }]}>{course.name}</TGText>
  </View>
)

EventHeader.propTypes = {
  course: courseShape.isRequired,
  teamEvent: bool.isRequired,
  scoringType: string.isRequired
}
export default EventHeader
