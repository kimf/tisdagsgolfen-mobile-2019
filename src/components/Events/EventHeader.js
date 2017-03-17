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

const EventHeader = ({ course, club, oldCourseName, teamEvent, scoringType }) => (
  <TGText style={{ padding: 10, backgroundColor: '#2A1313', textAlign: 'center', color: '#fff' }}>
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
