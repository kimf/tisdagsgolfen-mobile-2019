import { StyleSheet } from 'react-native'
import React from 'react'
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
  text: {
    padding: 10,
    backgroundColor: colors.muted,
    textAlign: 'center',
    color: colors.white
  }
})

const EventHeader = ({ course, club, oldCourseName, teamEvent, scoringType }) => (
  <TGText style={styles.text}>
    {gametypeName(scoringType)}
    {' ↝ '}
    {oldCourseName ? `${oldCourseName} ↝ ` : `${club} | ${course} ↝ `}
    {teamEvent ? 'Lag' : 'Individuellt'}
  </TGText>
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
