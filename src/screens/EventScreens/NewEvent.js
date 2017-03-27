import React, { Component, PropTypes } from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'

import CoursePicker from 'Events/CoursePicker'
import NewEventSetup from 'Events/NewEventSetup'
import Header from 'shared/Header'
import TouchableView from 'shared/TouchableView'
import styles, { NAVBAR_HEIGHT } from 'styles'

const { shape, string, func } = PropTypes

class NewEvent extends Component {
  static navigationOptions = {
    tabBar: () => ({
      visible: false
    })
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
        <Header title="Skapa runda" backgroundColor="#fff">
          <TouchableView
            style={{
              position: 'absolute',
              top: 20,
              right: 10,
              padding: 20
            }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image
              style={{ tintColor: '#ccc' }}
              source={require('../../images/close.png')}
            />
          </TouchableView>
        </Header>
        <View style={{ flex: 1, paddingTop: NAVBAR_HEIGHT, paddingLeft: 15 }}>
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
      </View>
    )
  }
}

const mapStateToProps = state => ({
  seasonId: state.app.currentSeason.id
})

export default connect(mapStateToProps)(NewEvent)
