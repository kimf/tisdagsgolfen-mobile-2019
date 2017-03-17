import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import update from 'immutability-helper'

const createLiveScoreMutation = gql`
  mutation createLiveScore(
    $eventId: ID!,
    $holeId: ID!,
    $scoreSessionId: ID!,
    $extraStrokes: Int!,
    $strokes:Int!,
    $putts:Int!,
    $points:Int!,
    $beers:Int!
  ) {
    createLiveScore(
      eventId:$eventId,
      holeId:$holeId,
      scoringSessionId:$scoreSessionId,
      extraStrokes:$extraStrokes,
      strokes:$strokes,
      putts:$putts,
      points:$points,
      beers:$beers
    ) {
      id
      extraStrokes
      strokes
      putts
      points
      beers
      scoringSession {
        id
      }
    }
  }
`

export default createLiveScoreMutation

/*
client.mutate({
  mutation: TodoCreateMutation,
  variables: {
    text,
  },
  update: (proxy, { data: { createTodo } }) => {
    // Read the data from our cache for this query.
    const data = proxy.readQuery({ query: TodoAppQuery });
    // Add our todo from the mutation to the end.
    data.todos.push(createTodo);
    // Write our data back to the cache.
    proxy.writeQuery({ query: TodoAppQuery, data });
  },
});
*/

export const withCreateLiveScoreMutation = graphql(createLiveScoreMutation, {
  props: ({ mutate }) => ({
    createLiveScore: (eventId, userId, holeId, scoreItem) => (
      mutate({
        variables: { eventId, userId, holeId, ...scoreItem },
        updateQueries: {
          scoringHoles: (prev, { mutationResult }) => {
            const holeIndex = prev.holes.findIndex(h => h.id === holeId)
            const newLs = mutationResult.data.createLiveScore
            return update(prev, {
              holes: {
                [holeIndex]: {
                  liveScores: { $push: [newLs] }
                }
              }
            })
          }
        }
      })
    )
  })
})
