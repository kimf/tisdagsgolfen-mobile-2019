import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { shape, bool } from 'prop-types'

import Header from 'shared/Header'
import TGText from 'shared/TGText'
import BottomButton from 'shared/BottomButton'

import { withCurrentUserQuery } from 'queries/currentUserQuery'
import { userShape } from 'propTypes'
import { setCache } from 'utils'
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
    data: shape({
      loading: bool,
      user: userShape
    })
  }

  static defaultProps = {
    data: {
      loading: true,
      user: null
    }
  }

  logout = async () => {
    const { email } = this.props.data.user
    await setCache('currentUser', { email })
  }

  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Header title="Profil" />
        <View style={{ flex: 1, padding: 20, paddingTop: NAVBAR_HEIGHT + 20 }}>
          <TGText>Här ska det vara lite statistik och grejor</TGText>
        </View>
        <BottomButton backgroundColor={colors.red} title="LOGGA UT" onPress={this.logout} />
      </View>
    )
  }
}

export default withCurrentUserQuery(Profile)
