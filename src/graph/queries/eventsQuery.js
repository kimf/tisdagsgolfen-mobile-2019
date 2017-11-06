import { arrayOf, bool, shape } from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { eventShape } from 'propTypes'

const eventsQuery = gql`
  query events($seasonId: ID!) {
    events(seasonId: $seasonId) {
      id
      status
      startsAt
      scoringType
      teamEvent
      course
    }
  }
`

export default eventsQuery

export const withEventsQuery = graphql(eventsQuery, {
  options: ({ seasonId }) => ({
    variables: { seasonId }
  })
})

export const eventsQueryProps = shape({
  events: arrayOf(eventShape),
  loading: bool
})
