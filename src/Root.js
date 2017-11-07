import React, { Component } from 'react'
import { bool, shape, number, string, func } from 'prop-types'

import Login from 'screens/Login'
import RootStack from 'routes'

class Root extends Component {
  static propTypes = {
    isLoggedin: bool.isRequired,
    onLogin: func.isRequired,
    onLogout: func.isRequired,
    currentUser: shape({
      id: string,
      email: string
    })
  }

  static defaultProps = {
    currentUser: null
  }

  render() {
    const {
      isLoggedin, currentUser, onLogin, onLogout
    } = this.props

    if (!isLoggedin) {
      return <Login currentUser={currentUser} onLogin={onLogin} />
    }

    return <RootStack screenProps={{ ...{ currentUser, onLogout } }} />
  }
}

export default Root
