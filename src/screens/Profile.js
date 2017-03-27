import React, { Component, PropTypes } from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'

import styles from 'styles'
import Header from 'shared/Header'
import TGText from 'shared/TGText'
import { logout } from 'actions/app'
import { userShape } from 'propTypes'
import { NAVBAR_HEIGHT } from 'styles'

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
        <Header title="Profil" />
        <View style={{ flex: 1, paddingTop: NAVBAR_HEIGHT }}>
          <TGText
            viewStyle={{ backgroundColor: 'red', marginVertical: 100, marginHorizontal: 20, padding: 20 }}
            style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}
            onPress={() => { onLogout(user.email) }}
          >
            LOGGA UT
          </TGText>
        </View>
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
