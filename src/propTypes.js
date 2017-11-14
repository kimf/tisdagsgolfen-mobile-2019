import { arrayOf, shape, string, bool, number } from 'prop-types'

export const seasonShape = shape({
  id: string.isRequired,
  closed: bool.isRequired,
  name: string.isRequired,
  photo: string,
  eventIds: arrayOf(number)
})

export const userShape = shape({
  id: string.isRequired,
  email: string,
  firstName: string.isRequired,
  lastName: string.isRequired,
  photo: string
})

export const screenPropsShape = shape({
  currentUser: shape({
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    photo: string
  }),
  activeScoringSession: shape(),
  seasons: arrayOf(seasonShape),
  isLoggedIn: bool.isRequired
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

export const courseShape = shape({
  id: string.isRequired,
  club: string.isRequired,
  name: string.isRequired
})

const eventShapeHash = {
  id: string.isRequired,
  scoringType: string.isRequired,
  status: string.isRequired,
  teamEvent: bool.isRequired,
  course: courseShape.isRequired
}
export const eventShape = shape(eventShapeHash)

export const eventWithLeaderboardshape = shape({
  ...eventShapeHash,
  leaderboard: arrayOf(shape({
    id: string.isRequired,
    photo: string,
    name: string.isRequired,
    position: number.isRequired,
    eventPoints: number.isRequired,
    beers: number.isRequired,
    kr: number.isRequired,
    value: number.isRequired
  }).isRequired)
})
