import gql from "graphql-tag";

const seasonQuery = gql`
  query seasonQuery($seasonId: ID) {
    season(id: $seasonId) {
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

export default seasonQuery;
