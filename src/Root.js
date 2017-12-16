import React, { Component } from 'react'
import { bool, shape, string } from 'prop-types'

import { setCache } from 'utils'
import EmptyState from 'shared/EmptyState'
import RootStack from 'routes'

import { withInitialQuery, initialQueryShape } from 'queries/initialQuery'

class Root extends Component {
  static propTypes = {
    isLoggedIn: bool.isRequired,
    data: initialQueryShape,
    currentUser: shape({
      id: string,
      email: string
    })
  }

  static defaultProps = {
    currentUser: null,
    data: {
      loading: true,
      activeScoringSession: null,
      seasons: []
    }
  }

  constructor(props) {
    super(props)
    const { currentUser, isLoggedIn } = props
    this.state = { currentUser, isLoggedIn }
  }

  onLogin = response => {
    setCache('currentUser', {
      ...response.user,
      token: response.token
    }).then(() => {
      this.setState(state => ({ ...state, isLoggedIn: true, currentUser: { ...response.user } }))
    })
  }

  onLogout = () => {
    const user = { email: this.state.currentUser.email }
    setCache('currentUser', {
      ...user,
      token: null
    }).then(() => {
      this.setState(state => ({ ...state, isLoggedIn: false, currentUser: { ...user } }))
    })
  }

  render() {
    const { data: { activeScoringSession, seasons, loading } } = this.props
    const { currentUser, isLoggedIn } = this.state

    if (loading) return null

    if (seasons.length === 0) return <EmptyState text="Inga säsonger..." />

    return (
      <RootStack
        screenProps={{
          currentUser,
          isLoggedIn,
          activeScoringSession,
          seasons,
          onLogin: this.onLogin,
          onLogout: this.onLogout
        }}
      />
    )
  }
}

export default withInitialQuery(Root)
