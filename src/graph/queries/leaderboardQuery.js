import { arrayOf, shape, string, bool, number } from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const leaderboardQuery = gql`
  query leaderboardQuery($seasonId: ID!) {
    players: allSeasonLeaderboards (
      orderBy: position_DESC,
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
        photo {
          url
        }
      }
    }
  }
`

export default leaderboardQuery

export const withLeaderboardQuery = graphql(leaderboardQuery, {
  options: ({ seasonId }) => ({ variables: { seasonId } })
})

export const leaderboardQueryProps = shape({
  data: shape({
    players: arrayOf(
      shape({
        user: shape({
          id: string.isRequired,
          firstName: string.isRequired,
          lastname: string.isRequired
        }),
        id: string.isRequired,
        averagePoints: number.isRequired,
        position: number.isRequired,
        previousPosition: number.isRequired,
        totalPoints: number.isRequired,
        totalBeers: number,
        totalKr: number,
        top5Points: number.isRequired,
        eventCount: number.isRequired
      })
    ),
    loading: bool
  })
})
