import React from 'react'
import { View, StyleSheet } from 'react-native'
import { shape, string, bool } from 'prop-types'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const gametypeName = (scoringType) => {
  switch (scoringType) {
    case 'modified_points':
      return 'Modifierad Poäng'
    case 'points':
      return 'Poäng'
    default:
      return 'Slag'
  }
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: colors.gray,
    flexDirection: 'column',
    height: 60
  },

  text: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 14
  }
})

const EventHeader = ({ course, oldCourseName, teamEvent, scoringType }) => (
  <View style={styles.view}>
    <TGText style={styles.text}>
      {oldCourseName || `${course.club} / ${course.name}`}
    </TGText>
    <TGText style={styles.text}>
      {teamEvent ? 'Lag' : 'Individuellt'}
      {' ↝ '}
      {gametypeName(scoringType)}
    </TGText>
  </View>
)

EventHeader.propTypes = {
  course: shape({
    name: string.isRequired,
    club: string.isRequired
  }),
  oldCourseName: string,
  teamEvent: bool.isRequired,
  scoringType: string.isRequired
}

EventHeader.defaultProps = {
  course: null,
  club: null,
  oldCourseName: null
}

export default EventHeader
