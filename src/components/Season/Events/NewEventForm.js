import React from 'react'
import {
  View,
  Text,
  Modal
} from 'react-native'
import NavigationBar from 'react-native-navbar'

import styles from '../../../styles'
import Button from '../../Shared/Button'

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
    <View style={styles.container}>
      <Text>Skapa ny runda</Text>
      <Button text="Tillbaka" onPress={goBack} />
    </View>
  </Modal>


const { func } = React.PropTypes
NewEventForm.propTypes = {
  goBack: func.isRequired
}

// NewEventForm.defaultProps = {}

export default NewEventForm
