import React, { PropTypes } from 'react'
import { View, TouchableHighlight, Text, Modal } from 'react-native'
import { Link } from 'react-router-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styles from '../styles'

const Profile = ({ data: { loading, user }, onLogout }) => {
  if (loading) { return null }

  return (
    <Modal
      animationType={'slide'}
      transparent={false}
      visible
      hardwareAccelerated
    >
      <View style={[{ marginTop: 22 }, styles.innerContainer]}>
        <View style={{ flex: 1 }}>
          <Text>Hej {user.firstName}</Text>
          <Link pop to="/" style={styles.btn}><Text>Tillbaka</Text></Link>

          <TouchableHighlight onPress={() => { onLogout(user.email) }}>
            <Text style={styles.btn}>LOGGA UT</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  )
}

Profile.propTypes = {
  data: PropTypes.shapeOf({
    loading: PropTypes.bool.isRequired,
    user: PropTypes.shapeOf({
      firstName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onLogout: PropTypes.func.isRequired
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

export default graphql(userQuery)(Profile)
