import { shape, string, bool } from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const activeScoringSessionQuery = gql`
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
  }
`

export default activeScoringSessionQuery

export const withActiveScoringSessionQuery = graphql(activeScoringSessionQuery, {
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
