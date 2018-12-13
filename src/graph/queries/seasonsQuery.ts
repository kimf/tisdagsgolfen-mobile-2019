import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { seasonsQueryQuery } from "../../../operation-result-types";

const seasonsQuery = gql`
  query seasonsQuery {
    seasons {
      id
      name
      closed
      photo
    }
  }
`;

export const withSeasonsQuery = graphql<{}, seasonsQueryQuery>(seasonsQuery);
