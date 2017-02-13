import React from 'react'
import { Modal } from 'react-native'
import NavigationBar from 'react-native-navbar'

import CoursePicker from './CoursePicker'
import styles from '../../../styles'

const NewEventForm = ({ goBack }) =>
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
    <CoursePicker selectCourse={this.selectCourse} />
  </Modal>


const { func } = React.PropTypes
NewEventForm.propTypes = {
  goBack: func.isRequired
}

// NewEventForm.defaultProps = {}

export default NewEventForm
