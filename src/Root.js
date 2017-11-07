import React, { Component } from 'react'
import { bool, shape, string, func } from 'prop-types'

import Login from 'screens/Login'
import RootStack from 'routes'

import {
  withActiveScoringSessionQuery,
  activeScoringSessionQueryShape
} from 'queries/activeScoringSessionQuery'

class Root extends Component {
  static propTypes = {
    isLoggedin: bool.isRequired,
    onLogin: func.isRequired,
    onLogout: func.isRequired,
    data: activeScoringSessionQueryShape,
    currentUser: shape({
      id: string,
      email: string
    })
  }

  static defaultProps = {
    currentUser: null,
    data: {
      loading: true,
      activeScoringSession: null
    }
  }

  render() {
    const {
      isLoggedin,
      currentUser,
      onLogin,
      onLogout,
      data: { activeScoringSession }
    } = this.props

    if (!isLoggedin) {
      return <Login currentUser={currentUser} onLogin={onLogin} />
    }

    return <RootStack screenProps={{ ...{ currentUser, onLogout, activeScoringSession } }} />
  }
}

export default withActiveScoringSessionQuery(Root)
