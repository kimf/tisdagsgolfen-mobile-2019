import React, { PropTypes } from 'react'
import { View, Button, Text } from 'react-native'
import NavigationBar from 'react-native-navbar'

import styles from '../styles'

const Profile = ({ user, onLogout }) => (
  <View style={styles.container}>
    <NavigationBar
      style={styles.header}
      statusBar={{ style: 'light-content', tintColor: '#2ecc71' }}
      title={{ title: 'Profil', tintColor: 'white' }}
    />
    <View style={{ flex: 1 }}>
      <Text>Hej {user.firstName} {user.lastName}</Text>
      <Button onPress={() => { onLogout(user.email) }} title="LOGGA UT" />
    </View>
  </View>
)

const { shape, string, func } = PropTypes

Profile.propTypes = {
  user: shape({
    firstName: string,
    lastName: string,
    email: string
  }).isRequired,
  onLogout: func.isRequired
}

export default Profile
