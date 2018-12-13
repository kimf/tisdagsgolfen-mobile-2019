import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { eventsQuery } from '../../../operation-result-types'

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

export const withEventsQuery = graphql<{}, eventsQuery>(eventsQuery)
