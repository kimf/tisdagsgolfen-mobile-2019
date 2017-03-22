import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const mainQuery = gql`
  query  {
    user {
      id
      scoringSession {
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
    seasons: allSeasons(
      orderBy: name_DESC
    ) {
      id
      name
      closed
      photo {
        url
      }
      players: seasonLeaderboards (
        orderBy: position_DESC
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
  }
`

export default mainQuery

export const withMainQuery = graphql(mainQuery)
