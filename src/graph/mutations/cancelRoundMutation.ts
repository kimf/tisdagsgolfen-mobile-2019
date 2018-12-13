import gql from 'graphql-tag'
import { graphql, MutationFn } from 'react-apollo'
import {
  cancelRoundMutationMutation,
  cancelRoundMutationMutationVariables
} from '../../../operation-result-types'
import asQuery from '../queries/activeScoringSessionQuery'

const cancelRoundMutation = gql`
  mutation cancelRoundMutation($scoringSessionId: ID!) {
    deleteScoringSession(scoringSessionId: $scoringSessionId) {
      id
    }
  }
`

export default cancelRoundMutation

export const withCancelRoundMutation = graphql<
  cancelRoundMutationMutationVariables,
  cancelRoundMutationMutation,
  cancelRoundMutationMutationVariables,
  { cancelRound: (scoringSessionId: string) => MutationFn }
>(cancelRoundMutation, {
  options: {
    update: proxy => {
      proxy.writeQuery({ query: asQuery, data: null })
    }
  }
})
