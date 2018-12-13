import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { eventQueryQuery, eventQueryQueryVariables } from '../../../operation-result-types'

const eventQuery = gql`
  query eventQuery($eventId: ID!, $seasonId: ID!) {
    players: seasonLeaderboard(seasonId: $seasonId, eventId: $eventId) {
      id
      photo
      name
      average
      eventCount
      topPoints
      position
      oldAverage
      oldTotalPoints
      prevPosition
      totalPoints
      totalKr
      beers
    }
    event(id: $eventId) {
      id
      status
      startsAt
      scoringType
      teamEvent
      course {
        id
        club
        name
      }
      leaderboard {
        id
        photo
        name
        position
        eventPoints
        beers
        kr
        value
      }
    }
  }
`

export default eventQuery

export const withEventQuery = graphql<
  eventQueryQueryVariables,
  eventQueryQuery,
  eventQueryQueryVariables
>(eventQuery, {
  options: ({ eventId, seasonId }) => ({
    variables: { eventId, seasonId }
  })
})
