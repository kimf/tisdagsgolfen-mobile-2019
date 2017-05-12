import React, { Component } from 'react'
import { View } from 'react-native'
import { shape, string, func } from 'prop-types'
import { connect } from 'react-redux'

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
