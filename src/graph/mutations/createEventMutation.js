import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const createEventMutation = gql`
  mutation createEvent(
    $seasonId:ID!,
    $courseId:ID!,
    $teamEvent:Boolean!,
    $scoringType:String!,
    $startsAt:DateTime!
  )
  {
    createEvent(
      seasonId: $seasonId,
      courseId: $courseId,
      teamEvent: $teamEvent,
      scoringType: $scoringType,
      startsAt: $startsAt,
      status: "planned",
      oldId: 0
    ) {
      id
    }
  }
`

export default createEventMutation

export const withCreateEventMutation = graphql(createEventMutation, {
  props({ mutate }) {
    return {
      createEvent({ seasonId, courseId, teamEvent, scoringType, startsAt }) {
        return mutate({
          variables: { seasonId, courseId, teamEvent, scoringType, startsAt }
        })
      }
    }
  }
})
