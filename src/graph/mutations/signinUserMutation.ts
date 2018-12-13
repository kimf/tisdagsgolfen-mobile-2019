import gql from "graphql-tag";
import { graphql } from "react-apollo";

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
`;

export default signinUser;

export const withSigninUserMutation = graphql(signinUser, {
  name: "signinUser",
});
