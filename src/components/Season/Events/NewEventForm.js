import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-native'
import NavigationBar from 'react-native-navbar'

import CoursePicker from './CoursePicker'
import NewEventSetup from './NewEventSetup'
import styles from '../../../styles'

class NewEventForm extends Component {
  state = { course: null }

  setCourse = (course) => {
    this.setState({ course })
  }

  render() {
    const { goBack, seasonId } = this.props
    const { course } = this.state
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible
        hardwareAccelerated
      >
        <NavigationBar
          style={styles.header}
          statusBar={{ style: 'light-content', tintColor: '#000' }}
          title={{ title: 'SKAPA NY RUNDA', tintColor: 'white' }}
          leftButton={{
            title: 'Avbryt',
            handler: goBack,
            tintColor: '#fff'
          }}
        />
        { course
          ?
            <NewEventSetup
              seasonId={seasonId}
              changeCourse={this.setCourse}
              course={course}
              goBack={goBack}
            />
          : <CoursePicker selectCourse={this.setCourse} />
        }
      </Modal>
    )
  }
}

NewEventForm.propTypes = {
  goBack: PropTypes.func.isRequired,
  seasonId: PropTypes.string.isRequired
}

export default NewEventForm
