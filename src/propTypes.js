import { func, shape, string, bool, number } from 'prop-types'

export const seasonShape = shape({
  id: string.isRequired,
  closed: bool.isRequired,
  name: string.isRequired,
  photo: string
})

export const userShape = shape({
  id: string.isRequired,
  email: string,
  firstName: string.isRequired,
  lastName: string.isRequired,
  photo: string
})

export const screenPropsShape = shape({
  currentUser: userShape.isRequired,
  activeScoringSession: shape(),
  onLogout: func.isRequired
})

export const leaderboardPlayerShape = shape({
  id: string.isRequired,
  name: string.isRequired,
  photo: string,
  average: number.isRequired,
  beerPos: number,
  eventCount: number.isRequired,
  krPos: number,
  position: number.isRequired,
  prevPosition: number.isRequired,
  beers: number,
  totalKr: number,
  totalPoints: number.isRequired
})

export const eventShape = shape({
  id: string.isRequired,
  scoringType: string.isRequired,
  status: string.isRequired,
  teamEvent: bool.isRequired,
  oldCourseName: string,
  course: string,
  club: string
})
