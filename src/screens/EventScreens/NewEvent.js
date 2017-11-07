import React, { Component } from 'react'
import { View } from 'react-native'
import { shape, func } from 'prop-types'

import CoursePicker from 'Events/CoursePicker'
import NewEventSetup from 'Events/NewEventSetup'
import styles from 'styles'
import { screenPropsShape } from 'propTypes'

class NewEvent extends Component {
  static navigationOptions = {
    title: 'Lägg till runda',
    tabBarVisible: false
  }

  static propTypes = {
    screenProps: screenPropsShape.isRequired,
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
    const { navigation, screenProps: { currentUser } } = this.props
    const { course } = this.state
    return (
      <View style={styles.container}>
        {course ? (
          <NewEventSetup
            currentUser={currentUser}
            navigation={navigation}
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
