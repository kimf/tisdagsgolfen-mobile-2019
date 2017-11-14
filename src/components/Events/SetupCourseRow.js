import React from 'react'
import { View } from 'react-native'
import { shape, string } from 'prop-types'

import styles, { colors } from 'styles'
import TGText from 'shared/TGText'

const SetupCourseRow = ({ course }) => (
  <View style={[styles.formRow, { backgroundColor: colors.lightGray, padding: 10 }]}>
    <TGText style={{ paddingLeft: 10, color: colors.semiDark, fontWeight: 'bold' }}>
      {course.club}
    </TGText>
    <TGText
      style={{
        marginTop: 5,
        paddingLeft: 10,
        color: colors.semiDark,
        fontWeight: 'bold'
      }}
    >
      {course.name}
    </TGText>
  </View>
)

SetupCourseRow.propTypes = {
  course: shape({
    club: string.isRequired,
    name: string.isRequired
  }).isRequired
}

export default SetupCourseRow
