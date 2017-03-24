import { PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { seasonShape } from 'propTypes'

const mainQuery = gql`
  query mainQuery {
    user {
      id
      email
      firstName
      lastName
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
    }
  }
`

export default mainQuery

export const withMainQuery = graphql(mainQuery)

const { arrayOf, shape, string, bool } = PropTypes

export const mainQueryProps = shape({
  data: shape({
    user: shape({
      id: string.isRequired,
      email: string.isRequired,
      firstName: string.isRequired,
      lastname: string.isRequired,
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
