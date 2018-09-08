import { arrayOf, shape, bool } from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { seasonShape } from '../../propTypes'

const seasonsQuery = gql`
  query seasonsQuery {
    seasons {
      id
      name
      closed
      photo
    }
  }
`

export const withSeasonsQuery = graphql(seasonsQuery)

export const seasonsQueryProps = shape({
  data: shape({
    seasons: arrayOf(seasonShape),
    loading: bool
  })
})
