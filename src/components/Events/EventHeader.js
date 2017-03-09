import React, { PropTypes } from 'react'
import { Text } from 'react-native'

import styles from '../../styles'

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

const EventHeader = ({ course, teamEvent, scoringType }) => (
  <Text style={[styles.inlineHeader, { backgroundColor: '#ccc', textAlign: 'center' }]}>
    {course}
    {' | '}
    {teamEvent ? 'Lag' : 'Individuellt'}
    {' | '}
    {gametypeName(scoringType)}
  </Text>
)

EventHeader.propTypes = {
  course: PropTypes.string.isRequired,
  teamEvent: PropTypes.bool.isRequired,
  scoringType: PropTypes.string.isRequired
}

export default EventHeader
