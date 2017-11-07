import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { shape, string } from 'prop-types'

import Header from 'shared/Header'
import TGText from 'shared/TGText'
import BottomButton from 'shared/BottomButton'
import { screenPropsShape } from 'propTypes'
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
    screenProps: screenPropsShape.isRequired
  }

  render() {
    const { screenProps: { currentUser, onLogout } } = this.props

    return (
      <View style={styles.container}>
        <Header title="Profil">
          <Image
            style={{
              height: 35,
              width: 35,
              borderRadius: 5,
              marginLeft: 20
            }}
            source={
              currentUser.photo
                ? { uri: currentUser.photo }
                : require('../images/defaultavatar.png')
            }
            resizeMode="cover"
          />
        </Header>
        <View style={{ flex: 1, padding: 20, paddingTop: NAVBAR_HEIGHT + 20 }}>
          <TGText>Hej {currentUser.firstName}, Här ska det vara lite statistik och grejor</TGText>
        </View>
        <BottomButton backgroundColor={colors.red} title="LOGGA UT" onPress={onLogout} />
      </View>
    )
  }
}

export default Profile
