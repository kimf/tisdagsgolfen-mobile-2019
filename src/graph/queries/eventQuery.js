import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


const eventQuery = gql`
  query eventQuery($eventId: ID!) {
    players: allEventLeaderboards(
      orderBy: position_ASC,
      filter: { event: { id: $eventId } }
    ) {
      id
      position
      previousTotalPosition
      totalAveragePoints
      totalEventCount
      totalEventPoints
      totalPosition
      score {
        id
        beers
        eventPoints
        kr
        value
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export default eventQuery

export const withEventQuery = graphql(eventQuery, {
  options: ({ event }) => ({ variables: { eventId: event.id } })
})
