import React, { Component } from 'react'
import { View } from 'react-native'
import { Switch, Route } from 'react-router-native'

import styles from './styles'
import { getCache, setCache } from './utils'

import Profile from './components/Profile'
import Login from './containers/Login'
import Home from './containers/Home'

class App extends Component {
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
        <Switch>
          <Route exact path="/profile" render={() => <Profile onLogout={this.logout} />} />
        </Switch>
      </View>
    )
  }
}


export default App
