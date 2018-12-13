import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { getAllUsersQuery } from "../../../operation-result-types";

const userQuery = gql`
  query getAllUsers {
    players: users {
      id
      email
      firstName
      lastName
      photo
    }
  }
`;
export default userQuery;

export const withUserQuery = graphql<{}, getAllUsersQuery>(userQuery);
