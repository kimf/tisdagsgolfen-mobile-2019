import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const currentUserQuery = gql`
  query getCurrentUser {
    user {
      id
      email
      firstName
      lastName
    }
  }
`
export default currentUserQuery

export const withCurrentUserQuery = graphql(currentUserQuery)
