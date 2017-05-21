import { PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { eventShape } from 'propTypes'

const eventsQuery = gql`
  query seasonEventsQuery($seasonId: ID!) {
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
      liveSessions: _scoringSessionsMeta (
        filter: { status_in: "live" }
      ) {
        count
      }
    }
  }
`

export default eventsQuery

export const withEventsQuery = graphql(eventsQuery, {
  options: ({ seasonId }) => ({ variables: { seasonId } })
})

const { arrayOf, bool, shape } = PropTypes
export const eventsQueryProps = shape({
  events: arrayOf(eventShape),
  loading: bool
})
