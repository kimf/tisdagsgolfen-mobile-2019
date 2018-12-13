import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

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

export const withActiveScoringSessionQuery = graphql(asQuery, {
  skip: ({ isLoggedin }) => !isLoggedin
})

export const activeScoringSessionQueryShape = shape({
  data: shape({
    scoringSession: shape({
      id: string.isRequired,
      event: shape({
        course: shape({
          name: string.isRequired
        })
      })
    }),
    loading: bool
  })
})
