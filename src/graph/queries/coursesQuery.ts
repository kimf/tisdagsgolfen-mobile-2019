import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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

export const withCoursesQuery = graphql(coursesQuery)
