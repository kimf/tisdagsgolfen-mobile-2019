import React from 'react'
import { View, Button, Text, Modal } from 'react-native'
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

          <Button onPress={() => { onLogout(user.email, goBack) }} title="LOGGA UT" />
        </View>
      </View>
    </Modal>
  )
}

const { shape, bool, string, func } = React.PropTypes

Profile.propTypes = {
  data: shape({
    loading: bool,
    user: shape({
      firstName: string,
      email: string
    })
  }).isRequired,
  onLogout: func.isRequired,
  goBack: func.isRequired
}

Profile.defaultProps = {
  data: {
    loading: true,
    user: {
      firstName: '',
      lastName: ''
    }
  }
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
