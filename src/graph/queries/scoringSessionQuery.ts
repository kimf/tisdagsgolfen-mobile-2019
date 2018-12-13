import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { NavigationScreenProp } from 'react-navigation'
import { scoringSessionQuery, scoringSessionQueryVariables } from '../../../operation-result-types'

const scoringSessionQuery = gql`
  query scoringSession($scoringSessionId: ID!) {
    scoringSession(id: $scoringSessionId) {
      id
      currentHole
      scoringType
      teamEvent
      course {
        id
        club
        name
        par
        holes {
          id
          number
          par
          index
        }
      }
      scoringItems {
        extraStrokes
        users {
          id
          firstName
          lastName
          photo
        }
      }
      liveScores {
        id
        user {
          id
        }
        teamIndex
        beers
        extraStrokes
        hole
        index
        par
        playerIds
        points
        putts
        strokes
      }
    }
  }
`

export default scoringSessionQuery

export const withScoringSessionQuery = graphql<
  { navigation: NavigationScreenProp<{ scoringSessionId: string }> },
  scoringSessionQuery,
  scoringSessionQueryVariables
>(scoringSessionQuery, {
  options: ({ navigation }) => ({
    variables: { scoringSessionId: navigation.state.params.scoringSessionId }
  })
})
