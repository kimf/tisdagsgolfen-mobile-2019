import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'

import CoursePicker from 'Events/CoursePicker'
import NewEventSetup from 'Events/NewEventSetup'
import styles from 'styles'

class NewEvent extends Component {
  static propTypes = {
    seasonId: PropTypes.string.isRequired,
    navigation: PropTypes.shape().isRequired
  }

  state = { course: null }

  setCourse = (course) => {
    this.setState({ course })
  }

  done = () => {
    this.props.navigation.goBack()
  }

  render() {
    const { seasonId } = this.props
    const { course } = this.state
    return (
      <View style={styles.container}>
        {course
          ? <NewEventSetup
            seasonId={seasonId}
            changeCourse={this.setCourse}
            course={course}
            done={this.done}
          />
          : <CoursePicker selectCourse={this.setCourse} />
        }
      </View>
    )
  }
}

export default NewEvent
