import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const scoringSessionQuery = gql`
  query scoringSession ($scoringSessionId: ID!) {
    scoringSession: ScoringSession(id: $scoringSessionId) {
      id
      currentHole
      course {
        id
        name
        holes (orderBy: number_ASC) {
          id
          number
          par
          index
          liveScores (
            filter: { scoringSession: { id: $scoringSessionId } }
          ) {
            id
            beers
            extraStrokes
            points
            putts
            strokes
            hole {
              id
            }
            scoringPlayer {
              id
            }
            scoringTeam {
              id
            }
          }
        }
      }
      scoringPlayers {
        id
        extraStrokes
        user {
          id
          firstName
          lastName
        }
      }
      scoringTeams {
        id
        extraStrokes
        users {
          id
          firstName
          lastName
        }
      }
      event {
        id
        scoringType
        teamEvent
      }
    }
  }
`
export default scoringSessionQuery

export const withScoringSessionQuery = graphql(scoringSessionQuery, {
  options: ({ scoringSessionId }) => ({
    variables: { scoringSessionId }
  })
})
