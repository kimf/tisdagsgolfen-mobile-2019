import React, { Component } from 'react'
import { shape, func } from 'prop-types'

import Login from '../../components/Login/Login'
import CoursePicker from '../../components/Events/CoursePicker'
import { screenPropsShape } from '../../propTypes'

class CoursePickerScreen extends Component {
  static navigationOptions = {
    title: 'Välj bana'
  }

  static propTypes = {
    screenProps: screenPropsShape.isRequired,
    navigation: shape({
      goBack: func.isRequired,
      navigate: func.isRequired
    }).isRequired
  }

  render() {
    const {
      navigation,
      screenProps: { currentUser, isLoggedIn, onLogin }
    } = this.props

    if (!isLoggedIn) {
      return <Login onLogin={onLogin} currentUser={currentUser} />
    }

    return (
      <CoursePicker selectCourse={course => navigation.navigate('NewEventSetup', { course })} />
    )
  }
}

export default CoursePickerScreen
