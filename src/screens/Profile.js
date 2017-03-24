import React, { Component, PropTypes } from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'

import styles from 'styles'
import TGText from 'shared/TGText'
import { logout } from 'actions/app'
import { userShape } from 'propTypes'

const { func } = PropTypes

class Profile extends Component {
  static navigationOptions = {
    title: 'Profil',
    tabBar: () => ({
      label: 'Profil',
      icon: ({ tintColor }) => (
        <Image
          source={require('../images/contacts-filled.png')}
          style={{ tintColor, height: 22, width: 22 }}
        />
      )
    }),
    header: () => ({
      visible: true
    })
  }

  static propTypes = {
    user: userShape.isRequired,
    onLogout: func.isRequired
  }

  render() {
    const { user, onLogout } = this.props

    return (
      <View style={styles.container}>
        <TGText
          style={{ marginVertical: 40, height: 40, textAlign: 'center' }}
        >
          Hej {user.firstName} {user.lastName}
        </TGText>
        <TGText
          style={{ textAlign: 'center' }}
          onPress={() => { onLogout(user.email) }}
        >
          LOGGA UT
        </TGText>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.app.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
