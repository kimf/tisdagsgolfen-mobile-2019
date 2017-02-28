import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'

import CoursePicker from './CoursePicker'
import NewEventSetup from './NewEventSetup'
import styles from '../../../styles'

class NewEventForm extends Component {
  state = { course: null }

  setCourse = (course) => {
    this.setState({ course })
  }

  render() {
    const { seasonId } = this.props
    const { course } = this.state
    return (
      <View style={styles.container}>
        { course
          ?
            <NewEventSetup
              seasonId={seasonId}
              changeCourse={this.setCourse}
              course={course}
            />
          : <CoursePicker selectCourse={this.setCourse} />
        }
      </View>
    )
  }
}

NewEventForm.propTypes = {
  seasonId: PropTypes.string.isRequired
}

export default NewEventForm
