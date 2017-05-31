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
      liveSessions: _scoringSessionsMeta (
        filter: { status_in: "live" }
      ) {
        count
      }
    }
  }
`

export default createEventMutation

export const withCreateEventMutation = graphql(createEventMutation, {
  props: ({ mutate }) => ({
    createEvent: (seasonId, courseId, teamEvent, scoringType, startsAt) => mutate({
      variables: { seasonId, courseId, teamEvent, scoringType, startsAt },
      refetchQueries: [
        'seasonEventsQuery'
      ]
    })
  })
})
