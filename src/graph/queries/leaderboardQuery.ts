import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  seasonLeaderboardQuery,
  seasonLeaderboardQueryVariables,
} from "../../../operation-result-types";

const leaderboardQuery = gql`
  query seasonLeaderboard($seasonId: ID!, $eventId: ID!) {
    players: seasonLeaderboard(seasonId: $seasonId, eventId: $eventId) {
      id
      photo
      name
      average
      eventCount
      topPoints
      position
      oldAverage
      oldTotalPoints
      prevPosition
      totalPoints
      totalKr
      beers
    }
  }
`;

export default leaderboardQuery;

export const withLeaderboardQuery = graphql<
  seasonLeaderboardQueryVariables,
  seasonLeaderboardQuery,
  seasonLeaderboardQueryVariables
>(leaderboardQuery, {
  options: ({ seasonId, eventId }) => ({
    variables: { seasonId, eventId },
  }),
});
