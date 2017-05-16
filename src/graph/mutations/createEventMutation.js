import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import update from 'immutability-helper'

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
      status
      startsAt
      oldCourseName
      course {
        id
        club
        name
      }
      scoringType
      teamEvent
    }
  }
`

export default createEventMutation

export const withCreateEventMutation = graphql(createEventMutation, {
  props: ({ mutate }) => ({
    createEvent: (seasonId, courseId, teamEvent, scoringType, startsAt) => mutate({
      variables: { seasonId, courseId, teamEvent, scoringType, startsAt },
      updateQueries: {
        seasonEventsQuery: (prev, { mutationResult }) => update(prev, {
          events: { $push: [mutationResult.data.createEvent] }
        })
      }
    })
  })
})
