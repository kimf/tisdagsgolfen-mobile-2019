import React, { Component } from 'react'
import { View, Platform, UIManager } from 'react-native'
import { Route } from 'react-router-native'

import styles from './styles'
import { getCache, setCache } from './utils'

import Profile from './components/Profile'
import Login from './containers/Login'
import Home from './containers/Home'

class App extends Component {
  constructor() {
    super()

    if (Platform.OS === 'android') {
      // eslint-disable-next-line no-unused-expressions
      UIManager.setLayoutAnimationEnabledExperimental
      && UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  state = { checkingLoggin: true, loggedOut: true, email: '' }

  componentDidMount() {
    getCache('currentUser').then((value) => {
      if (value && value.token) {
        this.setState({ checkingLoggin: false, loggedOut: false, email: value.email })
      } else {
        const email = value ? value.email : ''
        this.setState({ checkingLoggin: false, loggedOut: true, email })
      }
    })
  }

  logout = (email, callback) => {
    setCache('currentUser', { email }).then(() => {
      this.setState({ loggedOut: true })
      callback()
    })
  }

  login = (email, token) => {
    setCache('currentUser', { email, token }).then(() => {
      this.setState({ loggedOut: false })
    })
  }

  render() {
    if (this.state.checkingLoggin) { return null }
    if (this.state.loggedOut) { return <Login email={this.state.email} onLogin={this.login} /> }

    return (
      <View style={styles.container}>
        <Route path="/" component={Home} />
        <Route exact path="/profile" render={() => <Profile onLogout={this.logout} />} />
      </View>
    )
  }
}


export default App
