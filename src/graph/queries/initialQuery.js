import { arrayOf, shape, string, bool } from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { seasonShape } from 'propTypes'

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
    }
  }
`

export default initialQuery

export const withInitialQuery = graphql(initialQuery)

export const initialQueryShape = shape({
  data: shape({
    seasons: arrayOf(seasonShape),
    activeScoringSession: shape({
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
