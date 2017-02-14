import React from 'react'
import { View, TouchableHighlight, Text, Modal } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-native'
import NavigationBar from 'react-native-navbar'

import styles from '../styles'

const Profile = ({ data: { loading, user }, onLogout, goBack }) => {
  if (loading) { return null }

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
        title={{ title: `${user.firstName} ${user.lastName}`, tintColor: 'white' }}
        leftButton={{
          title: 'Avbryt',
          handler: goBack,
          tintColor: '#fff'
        }}
      />
      <View style={[{ marginTop: 22 }, styles.innerContainer]}>
        <View style={{ flex: 1 }}>
          <Text>Hej {user.firstName}</Text>

          <TouchableHighlight onPress={() => { onLogout(user.email, goBack) }}>
            <Text style={styles.btn}>LOGGA UT</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  )
}

const { shape, bool, string, func } = React.PropTypes

Profile.propTypes = {
  data: shape({
    loading: bool.isRequired,
    user: shape({
      firstName: string.isRequired,
      email: string.isRequired
    }).isRequired
  }).isRequired,
  onLogout: func.isRequired,
  goBack: func.isRequired
}

const userQuery = gql`
  query {
    user {
      id
      email
      firstName
      lastName
    }
  }
`

export default graphql(userQuery)(withRouter(Profile))
