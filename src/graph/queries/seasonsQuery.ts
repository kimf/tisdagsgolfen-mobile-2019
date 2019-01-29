import gql from "graphql-tag";

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

export default seasonsQuery;
