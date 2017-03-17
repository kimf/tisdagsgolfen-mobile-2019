import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const leaderboardQuery = gql`
  query($seasonId: ID!) {
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
  }
`

export default leaderboardQuery

export const withLeaderboardQuery = graphql(leaderboardQuery, {
  options: ({ seasonId }) => ({ forceFetch: false, variables: { seasonId } })
})
