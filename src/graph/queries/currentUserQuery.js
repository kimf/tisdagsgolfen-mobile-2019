import { shape, string, bool } from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { userShape } from 'propTypes'

const currentUserQuery = gql`
  query currentUserQuery {
    user {
      id
      email
      firstName
      lastName
      photo
      admin
      scoringSessions {
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
    seasons {
      id
      name
      closed
      photo
    }
  }
`

export default currentUserQuery

export const withCurrentUserQuery = graphql(currentUserQuery)

export const currentUserQueryProps = shape({
  data: shape({
    user: shape({
      ...userShape,
      scoringSession: shape({
        id: string.isRequired,
        event: shape({
          course: shape({
            name: string.isRequired
          })
        })
      })
    }),
    loading: bool
  })
})
