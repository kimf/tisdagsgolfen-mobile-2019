import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// ScoringPlayer:  extraStrokes: Int!, userId: ID!
const scoringSessionMutation = gql`
  mutation createScoringSession(
    $eventId:ID!,
    $courseId:ID!,
    $scorerId:ID!,
    $scoringPlayers: [ScoringSessionscoringPlayersScoringPlayer!],
  )
  {
    createScoringSession(
      eventId: $eventId,
      courseId: $courseId
      scorerId:$scorerId,
      currentHole: 1
      scoringPlayers: $scoringPlayers
    ) {
      id
    }
  }
`

export default scoringSessionMutation

export const withScoringSessionMutation = graphql(scoringSessionMutation, {
  props: ({ mutate }) => ({
    createScoringSession: (eventId, courseId, scorerId, scoringPlayers) => (
      mutate({
        variables: { eventId, courseId, scorerId, scoringPlayers }
      })
    )
  })
})
