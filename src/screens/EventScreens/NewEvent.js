import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'

import CoursePicker from 'Events/CoursePicker'
import NewEventSetup from 'Events/NewEventSetup'
import styles from 'styles'

const { shape, string, func } = PropTypes

class NewEvent extends Component {
  static propTypes = {
    navigation: shape({
      state: shape({
        params: shape({
          seasonId: string.isRequired
        }).isRequired
      }).isRequired,
      goBack: func.isRequired
    }).isRequired
  }

  state = { course: null }

  setCourse = (course) => {
    this.setState({ course })
  }

  done = () => {
    this.props.navigation.goBack()
  }

  render() {
    const seasonId = this.props.navigation.state.params.seasonId
    const course = this.state.course
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
