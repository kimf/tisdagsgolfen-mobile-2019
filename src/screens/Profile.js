import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import styles from 'styles'
import LinkButton from 'shared/LinkButton'
import { logout } from 'reducers/app'

const Profile = ({ user, onLogout }) => (
  <View style={styles.container}>
    <View style={{ flex: 1 }}>
      <Text>Hej {user.firstName} {user.lastName}</Text>
      <LinkButton onPress={() => { onLogout(user.email) }} title="LOGGA UT" />
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

const mapStateToProps = state => (
  {
    user: state.app.user
  }
)

const mapDispatchToProps = dispatch => (
  {
    onLogout: () => dispatch(logout())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
