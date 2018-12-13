import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const initialQuery = gql`
  query activeScoringSessionQuery {
    activeScoringSession {
      id
      scoringType
      teamEvent
      course {
        id
        club
        name
      }
    }
    seasons {
      id
      name
      closed
      photo
      eventCount
      eventIds
      winner
      finalInfo
    }
  }
`

export default initialQuery

export const withInitialQuery = graphql(initialQuery)
