import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const signinUser = gql`
  mutation authenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      user {
        id
        email
        firstName
        lastName
        photo
        admin
      }
      token
    }
  }
`

export default signinUser

export const withSigninUserMutation = graphql(signinUser, {
  name: 'signinUser'
})
