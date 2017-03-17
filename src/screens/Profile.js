import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import styles from 'styles'
import TGText from 'shared/TGText'
import { logout } from 'actions/app'

const { shape, string, func } = PropTypes

class Profile extends Component {
  static navigatorButtons = {
    leftButtons: [
      { title: 'Tillbaka', id: 'back' }
    ]
  }

  static propTypes = {
    user: shape({
      firstName: string,
      lastName: string,
      email: string
    }).isRequired,
    onLogout: func.isRequired,
    navigator: shape().isRequired
  }

  constructor(props) {
    super(props)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'back') {
        this.props.navigator.dismissModal()
      }
    }
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

const mapStateToProps = state => ({ user: state.app.user })

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
