import { PropTypes } from 'react'

const { shape, string, bool, number } = PropTypes

export const seasonShape = shape({
  id: string.isRequired,
  closed: bool.isRequired,
  name: string.isRequired,
  photo: shape({
    url: string
  })
})

export const userShape = shape({
  id: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  photo: shape({
    url: string.isRequired
  })
})

export const leaderboardPlayerShape = shape({
  averagePoints: number.isRequired,
  beerPos: number,
  eventCount: number.isRequired,
  id: string.isRequired,
  krPos: number,
  position: number.isRequired,
  previousPosition: number.isRequired,
  totalBeers: number,
  totalKr: number,
  totalPoints: number.isRequired,
  user: userShape.isRequired
})

export const eventShape = shape({
  id: string.isRequired,
  scoringType: string.isRequired,
  status: string.isRequired,
  teamEvent: bool.isRequired,
  oldCourseName: string,
  course: shape({
    club: string,
    course: string
  })
})
