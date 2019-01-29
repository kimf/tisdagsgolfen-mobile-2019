import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { eventQueryQuery, eventQueryQueryVariables } from "../../../operation-result-types";

const eventQuery = gql`
  query eventQuery($eventId: ID!) {
    event(id: $eventId) {
      id
      status
      startsAt
      scoringType
      teamEvent
      course {
        id
        club
        name
      }
      leaderboard {
        id
        photo
        name
        position
        eventPoints
        beers
        kr
        value
      }
    }
  }
`;

export default eventQuery;

export const withEventQuery = graphql<
  eventQueryQueryVariables,
  eventQueryQuery,
  eventQueryQueryVariables
>(eventQuery, {
  options: ({ eventId }) => ({
    variables: { eventId },
  }),
});
