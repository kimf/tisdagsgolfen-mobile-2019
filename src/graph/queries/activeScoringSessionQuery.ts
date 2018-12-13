import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { asQueryQuery } from '../../../operation-result-types'

const asQuery = gql`
  query asQuery {
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
  }
`

export default asQuery

export const withActiveScoringSessionQuery = graphql<{ isLoggedIn: boolean }, asQueryQuery>(
  asQuery,
  {
    skip: ({ isLoggedin }) => !isLoggedin
  }
)
