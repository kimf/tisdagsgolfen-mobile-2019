import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { shape, string } from 'prop-types'

import Header from 'shared/Header'
import TGText from 'shared/TGText'
import BottomButton from 'shared/BottomButton'

import styles, { colors, NAVBAR_HEIGHT } from 'styles'

class Profile extends Component {
  static navigationOptions = {
    header: null,
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
    screenProps: shape({
      currentUser: shape({
        user: shape({
          firstName: string.isRequired
        })
      })
    }).isRequired
  }

  render() {
    const { screenProps } = this.props

    return (
      <View style={styles.container}>
        <Header title="Profil" />
        <View style={{ flex: 1, padding: 20, paddingTop: NAVBAR_HEIGHT + 20 }}>
          <TGText>
            Hej {screenProps.currentUser.firstName}, Här ska det vara lite statistik och grejor
          </TGText>
        </View>
        <BottomButton
          backgroundColor={colors.red}
          title="LOGGA UT"
          onPress={screenProps.onLogout}
        />
      </View>
    )
  }
}

export default Profile
