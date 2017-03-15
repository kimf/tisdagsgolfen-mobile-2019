import React, { PropTypes } from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'
import TouchableView from 'shared/TouchableView'
import styles from 'styles'

const CourseRow = ({ course, selectCourse }) =>
  <TouchableView
    key={`course_row_${course.id}`}
    style={styles.courserow}
    onPress={() => selectCourse(course)}
  >
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TGText style={{ flex: 2 }}>
          {course.name}
        </TGText>
        <TGText style={{ flex: 1 }}>
          PAR {course.par}
        </TGText>
        <TGText style={{ flex: 1 }}>
          {course.holes.count} HÅL
        </TGText>
      </View>
      <View style={{ flex: 1 }}>
        <TGText style={{ color: '#777', marginTop: 10 }}>
          {course.club}
        </TGText>
      </View>
    </View>
  </TouchableView>

const { string, number, shape, func } = PropTypes

CourseRow.propTypes = {
  course: shape({
    id: string.isRequired,
    club: string.isRequired,
    name: string.isRequired,
    par: number.isRequired,
    holes: shape({
      count: number.isRequired
    }).isRequired
  }).isRequired,
  selectCourse: func.isRequired
}

export default CourseRow
