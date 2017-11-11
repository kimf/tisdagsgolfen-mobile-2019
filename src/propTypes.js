import { arrayOf, shape, string, bool, number } from 'prop-types'

export const seasonShape = shape({
  id: string.isRequired,
  closed: bool.isRequired,
  name: string.isRequired,
  photo: string,
  eventIds: arrayOf(number).isRequired
})

export const userShape = shape({
  id: string.isRequired,
  email: string,
  firstName: string.isRequired,
  lastName: string.isRequired,
  photo: string
})

export const screenPropsShape = shape({
  currentUser: userShape,
  activeScoringSession: shape(),
  seasons: arrayOf(seasonShape)
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

const eventShapeHash = {
  id: string.isRequired,
  scoringType: string.isRequired,
  status: string.isRequired,
  teamEvent: bool.isRequired,
  course: string
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
