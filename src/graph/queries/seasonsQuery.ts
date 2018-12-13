import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

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
