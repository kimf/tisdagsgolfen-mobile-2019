import React, { Component } from 'react'
import { func } from 'prop-types'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'

import Header from 'shared/Header'
import TGText from 'shared/TGText'
import BottomButton from 'shared/BottomButton'

import { logout } from 'actions/app'
import { userShape } from 'propTypes'
import styles, { colors, NAVBAR_HEIGHT } from 'styles'

class Profile extends Component {
  static navigationOptions = {
    title: 'Profil',
    tabBarLabel: 'Profil',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/contacts-filled.png')}
        style={{ tintColor, height: 22, width: 22 }}
      />
    )
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
        <View style={{ flex: 1, padding: 20, paddingTop: NAVBAR_HEIGHT + 20 }}>
          <TGText>Här ska det vara lite statistik och grejor</TGText>
        </View>
        <BottomButton backgroundColor={colors.red} title="LOGGA UT" onPress={() => { onLogout(user.email) }} />
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
