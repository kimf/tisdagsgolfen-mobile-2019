import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const eventsQuery = gql`
  query($seasonId: ID!) {
    events: allEvents (
      orderBy: startsAt_DESC
      filter: { season: { id: $seasonId } }
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

export default eventsQuery

export const withEventsQuery = graphql(eventsQuery, {
  options: ({ seasonId }) => ({ forceFetch: false, variables: { seasonId } })
})
