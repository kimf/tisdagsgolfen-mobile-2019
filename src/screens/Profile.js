import React, { Component, PropTypes } from 'react'
import { View/* , Image*/ } from 'react-native'
import { connect } from 'react-redux'

import styles from 'styles'
import TGText from 'shared/TGText'
import { logout } from 'actions/app'

const { shape, string, func } = PropTypes

class Profile extends Component {
  static navigationOptions = {
    title: 'Profil',
    header: () => ({
      visible: true
    })
  }

  /* static navigatorButtons = {
    leftButtons: [
      { icon: require('../images/close.png'), id: 'back' }
    ]
  }*/

  static propTypes = {
    navigation: shape({
      state: shape({
        params: shape({
          user: shape({
            firstName: string,
            lastName: string,
            email: string
          })
        })
      })
    }).isRequired,
    onLogout: func.isRequired
  }

  static defaultProps = {
    data: {
      loading: true,
      user: null
    }
  }

  render() {
    const onLogout = this.props.onLogout
    const user = this.props.navigation.state.params.user

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

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Profile)
