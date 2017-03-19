import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const leaderboardQuery = gql`
  query($seasonId: ID!, $userId: ID!) {
    players: allSeasonLeaderboards (
      orderBy: position_DESC
      filter: { season: { id: $seasonId } }
    ) {
      id
      averagePoints
      position
      previousPosition
      totalPoints
      totalBeers
      totalKr
      top5Points
      eventCount
      user {
        id
        firstName
        lastName
      }
    }
    scoringSessions: allScoringSessions (
      filter: { scorer: { id: $userId } }
    ) {
      id
      event {
        id
        course {
          id
          club
          name
        }
      }
    }
  }
`

export default leaderboardQuery

export const withLeaderboardQuery = graphql(leaderboardQuery, {
  options: ({ seasonId, userId }) => ({
    forceFetch: false, variables: { seasonId, userId }
  })
})
