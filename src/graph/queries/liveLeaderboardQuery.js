import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const liveLeaderboardQuery = gql`
  query liveLeaderboardQuery($eventId: ID!) {
    liveScores: allLiveScores(
      filter: { event: { id: $eventId } }
    ) {
      id
      beers
      points
      putts
      strokes
      hole {
        id
        par
      }
      scoringPlayer {
        id
        user {
          id
          firstName
          lastName
          photo {
            url
          }
        }
      }
    }
  }
`

export default liveLeaderboardQuery

export const withLiveLeaderboardQuery = graphql(liveLeaderboardQuery, {
  options: ({ eventId }) => ({
    fetchPolicy: 'cache-and-network',
    pollInterval: 60000,
    variables: { eventId }
  })
})
