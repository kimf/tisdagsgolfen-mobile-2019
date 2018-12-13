import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const eventsQuery = gql`
  query events {
    events {
      id
      status
      startsAt
      scoringType
      teamEvent
      course {
        id
        club
        name
      }
    }
  }
`

export default eventsQuery

export const withEventsQuery = graphql(eventsQuery)

export const eventsQueryProps = shape({
  events: arrayOf(eventShape),
  loading: bool
})
