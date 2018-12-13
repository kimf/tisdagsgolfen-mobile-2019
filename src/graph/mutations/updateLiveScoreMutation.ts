import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const updateLiveScoreMutation = gql`
  mutation updateLiveScore($id: ID!, $data: LiveScoreDataInput!) {
    updateLiveScore(id: $id, data: $data) {
      id
      extraStrokes
      strokes
      putts
      points
      beers
    }
  }
`

export default updateLiveScoreMutation

export const withUpdateLiveScoreMutation = graphql(updateLiveScoreMutation, {
  props: ({ mutate }) => ({
    updateLiveScore: (id, data) => mutate({ variables: { id, data } })
  })
})
