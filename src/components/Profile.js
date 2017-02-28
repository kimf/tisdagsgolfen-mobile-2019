import React from 'react'
import { View, Button, Text } from 'react-native'
import NavigationBar from 'react-native-navbar'

import styles from '../styles'

const Profile = ({ user, onLogout }) => (
  <View style={styles.container}>
    <NavigationBar
      style={styles.header}
      statusBar={{ style: 'light-content', tintColor: '#000' }}
      title={{ title: 'PROFIL', tintColor: 'white' }}
    />
    <View style={{ flex: 1 }}>
      <Text>Hej {user.firstName} {user.lastName}</Text>

      <Button onPress={() => { onLogout(user.email) }} title="LOGGA UT" />
    </View>
  </View>
)

const { shape, string, func } = React.PropTypes

Profile.propTypes = {
  user: shape({
    firstName: string,
    lastName: string,
    email: string
  }).isRequired,
  onLogout: func.isRequired
}

export default Profile
