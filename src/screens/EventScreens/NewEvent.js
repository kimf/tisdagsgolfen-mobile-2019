import React, { Component } from 'react'
import { View } from 'react-native'
import { string, shape, func } from 'prop-types'

import CoursePicker from 'Events/CoursePicker'
import NewEventSetup from 'Events/NewEventSetup'
import styles from 'styles'

class NewEvent extends Component {
  static navigationOptions = {
    title: 'Lägg till runda',
    tabBarVisible: false
  }

  static propTypes = {
    seasonId: string.isRequired,
    navigation: shape({
      goBack: func.isRequired,
      navigate: func.isRequired
    }).isRequired
  }

  state = { course: null }

  setCourse = (course) => {
    this.setState({ course })
  }

  render() {
    const { seasonId, navigation } = this.props
    const course = this.state.course
    return (
      <View style={styles.container}>
        {course ? (
          <NewEventSetup
            navigation={navigation}
            seasonId={seasonId}
            changeCourse={this.setCourse}
            course={course}
          />
        ) : (
          <CoursePicker selectCourse={this.setCourse} />
        )}
      </View>
    )
  }
}

export default NewEvent
