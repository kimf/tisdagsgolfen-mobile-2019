import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  liveLeaderboardQueryQuery,
  liveLeaderboardQueryQueryVariables,
} from "../../../operation-result-types";

const liveLeaderboardQuery = gql`
  query liveLeaderboardQuery($scoringSessionId: ID!) {
    user {
      id
    }
    liveLeaderboard(scoringSessionId: $scoringSessionId) {
      id
      position
      photo
      name
      beers
      kr
      points
      strokes
    }
  }
`;

export default liveLeaderboardQuery;

export const withLiveLeaderboardQuery = graphql<
  liveLeaderboardQueryQueryVariables,
  liveLeaderboardQueryQuery,
  liveLeaderboardQueryQueryVariables
>(liveLeaderboardQuery, {
  options: ({ scoringSessionId }) => ({
    variables: { scoringSessionId },
    fetchPolicy: "network-only",
    pollInterval: 30000,
  }),
});
