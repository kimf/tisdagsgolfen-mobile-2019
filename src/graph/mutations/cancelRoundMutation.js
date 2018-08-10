import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import update from 'immutability-helper'

const cancelRoundMutation = gql`
  mutation cancelRoundMutation($scoringSessionId: ID!) {
    deleteScoringSession(scoringSessionId: $scoringSessionId) {
      id
    }
  }
`

export default cancelRoundMutation

export const withCancelRoundMutation = graphql(cancelRoundMutation, {
  props: ({ mutate }) => ({
    cancelRound: scoringSessionId =>
      mutate({
        variables: { scoringSessionId },
        updateQueries: {
          asQuery: prev =>
            update(prev, {
              activeScoringSession: { $set: null }
            })
        }
      })
  })
})
