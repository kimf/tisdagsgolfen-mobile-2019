import React, { Component } from 'react'
import { Image } from 'react-native'
import { bool, shape, string } from 'prop-types'

import { setCache } from 'utils'
import EmptyState from 'shared/EmptyState'
import RootStack from 'routes'

import { withInitialQuery, initialQueryShape } from 'queries/initialQuery'

class Root extends Component {
  static propTypes = {
    isLoggedin: bool.isRequired,
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

  onLogin = (response) => {
    setCache('currentUser', {
      ...response.user,
      token: response.token
    }).then(() => {
      this.setState(state => ({ ...state, isLoggedin: true, currentUser: { ...response.user } }))
    })
  }

  onLogout = () => {
    const user = { email: this.state.currentUser.email }
    setCache('currentUser', {
      ...user,
      token: null
    }).then(() => {
      this.setState(state => ({ ...state, isLoggedin: false, currentUser: { ...user } }))
    })
  }

  render() {
    const { isLoggedin, currentUser, data: { activeScoringSession, seasons, loading } } = this.props

    if (loading) return null

    if (seasons.length === 0) return <EmptyState text="Inga säsonger..." />

    seasons.filter(s => s.photo).map(season => Image.prefetch(season.photo))
    return (
      <RootStack
        screenProps={{
          currentUser,
          isLoggedin,
          activeScoringSession,
          seasons
        }}
      />
    )
  }
}

export default withInitialQuery(Root)
