import { arrayOf, shape, string, bool } from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { seasonShape, userShape } from 'propTypes'

const mainQuery = gql`
  query mainQuery {
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

export default mainQuery

export const withMainQuery = graphql(mainQuery, {
  skip: ({ loggedIn }) => !loggedIn
})

export const mainQueryProps = shape({
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
    seasons: arrayOf(seasonShape),
    loading: bool
  })
})
