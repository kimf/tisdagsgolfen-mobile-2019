import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { coursesQueryQuery } from '../../../operation-result-types'

const coursesQuery = gql`
  query coursesQuery {
    courses {
      id
      club
      name
      par
      holeCount
      eventCount
    }
  }
`

export default coursesQuery

export const withCoursesQuery = graphql<{}, coursesQueryQuery>(coursesQuery)
