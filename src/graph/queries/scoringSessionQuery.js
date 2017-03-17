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
        }
      }
      event {
        id
        scoringType
        teamEvent
      }
      scoringPlayers {
        extraStrokes
        user {
          id
          firstName
          lastName
        }
        liveScores {
          beers
          extraStrokes
          points
          putts
          strokes
          hole {
            id
          }
        }
      }
      scoringTeams {
        extraStrokes
        users {
          id
          firstName
          lastName
        }
        liveScores {
          beers
          extraStrokes
          points
          putts
          strokes
          hole {
            id
          }
        }
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
