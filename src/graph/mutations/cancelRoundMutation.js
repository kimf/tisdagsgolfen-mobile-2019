import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const cancelRoundMutation = gql`
  mutation cancelRoundMutation($scoringSessionId: ID!) {
    deleteScoringSession(id: $scoringSessionId) {
      id
    }
  }
`

export default cancelRoundMutation

export const withCancelRoundMutation = graphql(cancelRoundMutation, {
  props: ({ mutate }) => ({
    cancelRound: scoringSessionId => mutate({ variables: { scoringSessionId } })
  })
})
