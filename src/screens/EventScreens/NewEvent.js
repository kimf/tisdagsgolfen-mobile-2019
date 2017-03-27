import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import CoursePicker from 'Events/CoursePicker'
import NewEventSetup from 'Events/NewEventSetup'
import styles from 'styles'

const { shape, string, func } = PropTypes

class NewEvent extends Component {
  static navigationOptions = {
    title: 'Lägg till runda',
    tabBar: () => ({ visible: false })
  }

  static propTypes = {
    seasonId: string.isRequired,
    navigation: shape({
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
    const seasonId = this.props.seasonId
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

const mapStateToProps = state => ({
  seasonId: state.app.currentSeason.id
})

export default connect(mapStateToProps)(NewEvent)
