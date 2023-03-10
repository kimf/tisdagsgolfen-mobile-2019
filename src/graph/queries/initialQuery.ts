import gql from "graphql-tag";

const initialQuery = gql`
  query initialQuery {
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
      leaderboard {
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
  }
`;

export default initialQuery;
