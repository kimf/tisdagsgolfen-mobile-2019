import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'

import CoursePicker from '../../components/Events/CoursePicker'
import NewEventSetup from '../../components/Events/NewEventSetup'
import styles from '../../styles'

class NewEvent extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Avbryt',
        id: 'cancel'
      }
    ]
  }

  constructor(props) {
    super(props)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  state = { course: null }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        this.props.navigator.dismissModal()
      }
    }
  }

  setCourse = (course) => {
    this.setState({ course })
  }

  done = () => {
    this.props.navigator.dismissModal()
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
              done={this.done}
            />
          : <CoursePicker selectCourse={this.setCourse} />
        }
      </View>
    )
  }
}

NewEvent.propTypes = {
  seasonId: PropTypes.string.isRequired,
  navigator: PropTypes.shape().isRequired
}

export default NewEvent
