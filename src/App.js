import React, { Component } from 'react'
import { View, Platform, UIManager } from 'react-native'
import { Route } from 'react-router-native'
import OneSignal from 'react-native-onesignal'

import styles from './styles'
import { getCache, setCache } from './utils'

import Profile from './components/Profile'
import Login from './containers/Login'
import Home from './containers/Home'

/* eslint-disable no-console */
const onReceived = (notification) => {
  console.log('Notification received: ', notification)
}

const onOpened = (openResult) => {
  console.log('Message: ', openResult.notification.payload.body)
  console.log('Data: ', openResult.notification.payload.additionalData)
  console.log('isActive: ', openResult.notification.isAppInFocus)
  console.log('openResult: ', openResult)
}

const onRegistered = (notifData) => {
  console.log('Device has been registered for push notifications!', notifData)
}

const onIds = (device) => {
  console.log('Device info: ', device)
}
/* eslint-enable no-console */


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

  componentWillMount() {
    OneSignal.addEventListener('received', onReceived)
    OneSignal.addEventListener('opened', onOpened)
    OneSignal.addEventListener('registered', onRegistered)
    OneSignal.addEventListener('ids', onIds)
  }

  componentDidMount() {
    OneSignal.configure({
      onNotificationOpened: (message, data, isActive) => {
        // eslint-disable-next-line no-console
        console.log('Notification', message, data, isActive)
      }
    })

    getCache('currentUser').then((value) => {
      if (value && value.token) {
        this.setState({ checkingLoggin: false, loggedOut: false, email: value.email })
      } else {
        const email = value ? value.email : ''
        this.setState({ checkingLoggin: false, loggedOut: true, email })
      }
    })
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', onReceived)
    OneSignal.removeEventListener('opened', onOpened)
    OneSignal.removeEventListener('registered', onRegistered)
    OneSignal.removeEventListener('ids', onIds)
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
