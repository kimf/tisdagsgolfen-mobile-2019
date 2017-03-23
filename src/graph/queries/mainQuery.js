import { PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const mainQuery = gql`
  query  {
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

const { arrayOf, shape, string, bool, number } = PropTypes

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
    seasons: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired,
      closed: bool.isRequired,
      photo: shape({
        url: string
      }),
      players: arrayOf(shape())
    })),
    loading: bool
  })
})
