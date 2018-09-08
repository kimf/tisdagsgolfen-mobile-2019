import { arrayOf, bool, shape } from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { eventShape } from '../../propTypes'

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
