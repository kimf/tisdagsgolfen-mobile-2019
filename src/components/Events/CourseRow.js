import React, { PropTypes } from 'react'

import TGText from 'shared/TGText'
import styles from 'styles'

const CourseRow = ({ course, selectCourse }) =>
  <TGText style={styles.courserow} onPress={() => selectCourse(course)} key={`course_row_${course.id}`}>
    {course.name} {course.par}
  </TGText>

CourseRow.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string.isRequired,
    par: PropTypes.number.isRequired
  }).isRequired,
  selectCourse: PropTypes.func.isRequired
}

export default CourseRow
