import { arrayOf, shape, bool } from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { leaderboardPlayerShape } from 'propTypes'

const leaderboardQuery = gql`
  query seasonLeaderboard($seasonId: ID!, $eventId: ID!) {
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
  }
`

export default leaderboardQuery

export const withLeaderboardQuery = graphql(leaderboardQuery, {
  options: ({ seasonId, eventId }) => ({
    variables: { seasonId, eventId }
  })
})

export const leaderboardQueryProps = shape({
  data: shape({
    players: arrayOf(leaderboardPlayerShape),
    loading: bool
  })
})
