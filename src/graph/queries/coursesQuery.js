import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const coursesQuery = gql`
   query {
    courses: allCourses (
      orderBy: club_ASC
    ) {
      id
      club
      name
      par
      holes: _holesMeta {
        count
      }
    }
   }
`

export default coursesQuery

export const withCoursesQuery = graphql(coursesQuery)
