import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { activeScoringSessionQueryQuery } from "../../../operation-result-types";

const initialQuery = gql`
  query activeScoringSessionQuery {
    activeScoringSession {
      id
      scoringType
      teamEvent
      course {
        id
        club
        name
      }
    }
    seasons {
      id
      name
      closed
      photo
      eventCount
      eventIds
      winner
      finalInfo
    }
  }
`;

export default initialQuery;

export const withInitialQuery = graphql<{}, activeScoringSessionQueryQuery>(initialQuery);
