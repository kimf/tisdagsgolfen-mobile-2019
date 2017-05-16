import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const scoringSessionMutation = gql`
  mutation createScoringSession(
    $eventId:ID!,
    $courseId:ID!,
    $scorerId:ID!,
    $scoringPlayers: [ScoringSessionscoringPlayersScoringPlayer!],
    $scoringTeams: [ScoringSessionscoringTeamsScoringTeam!]
  )
  {
    createScoringSession(
      eventId: $eventId,
      courseId: $courseId
      scorerId:$scorerId,
      currentHole: 1
      scoringPlayers: $scoringPlayers
      scoringTeams: $scoringTeams
    ) {
      id
    }
  }
`

export default scoringSessionMutation

export const withScoringSessionMutation = graphql(scoringSessionMutation, {
  props: ({ mutate }) => ({
    createScoringSession: (eventId, courseId, scorerId, scoringPlayers, scoringTeams = null) => (
      mutate({
        variables: { eventId, courseId, scorerId, scoringPlayers, scoringTeams }
      })
    )
  })
})
