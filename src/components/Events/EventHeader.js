import React, { PropTypes } from 'react'

import TGText from 'shared/TGText'

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
  <TGText style={{ padding: 10, backgroundColor: '#2A1313', textAlign: 'center', color: '#fff' }}>
    {gametypeName(scoringType)}
    {' ↝ '}
    {course}
    {' ↝ '}
    {teamEvent ? 'Lag' : 'Individuellt'}
  </TGText>
)

EventHeader.propTypes = {
  course: PropTypes.string.isRequired,
  teamEvent: PropTypes.bool.isRequired,
  scoringType: PropTypes.string.isRequired
}

export default EventHeader
