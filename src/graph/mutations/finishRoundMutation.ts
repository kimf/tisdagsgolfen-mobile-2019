import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const finishRoundMutation = gql`
  mutation finishRoundMutation($scoringSessionId: ID!) {
    updateScoringSession(id: $scoringSessionId, status: "finished") {
      id
    }
  }
`

export default finishRoundMutation

export const withFinishRoundMutation = graphql(finishRoundMutation, {
  props: ({ mutate }) => ({
    finishRound: scoringSessionId =>
      mutate({
        variables: { scoringSessionId },
        refetchQueries: ['seasonEventsQuery']
      })
  })
})
