import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const liveLeaderboardQuery = gql`
  query liveLeaderboardQuery($eventId: ID!) {
    scoringSessions: allScoringSessions(
      filter: {
        event: { id: $eventId }
      }
    ) {
      scoringPlayers {
        id
        liveScores {
          id
          beers
          points
          putts
          strokes
          hole {
            id
            par
          }
        }
        user {
          id
          firstName
          lastName
          photo {
            url
          }
        }
      }
      scoringTeams {
        id
        liveScores {
          id
          beers
          points
          putts
          strokes
          hole {
            id
            par
          }
        }
        users {
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
    fetchPolicy: 'network-only',
    pollInterval: 30000,
    variables: { eventId }
  })
})
