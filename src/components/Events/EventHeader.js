import React, { PropTypes } from 'react'
import { StyleSheet } from 'react-native'

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
  course: PropTypes.string,
  club: PropTypes.string,
  oldCourseName: PropTypes.string,
  teamEvent: PropTypes.bool.isRequired,
  scoringType: PropTypes.string.isRequired
}

EventHeader.defaultProps = {
  course: null,
  club: null,
  oldCourseName: null
}

export default EventHeader
