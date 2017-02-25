import React, { Component } from 'react'
import { AppState, AsyncStorage, View, Platform, UIManager } from 'react-native'
import { Route, Redirect } from 'react-router-native'
import OneSignal from 'react-native-onesignal'
import deviceLog, { LogView } from 'react-native-device-log'

import styles from './styles'
import { getCache, setCache } from './utils'

import Profile from './components/Profile'
import Login from './containers/Login'
import Home from './containers/Home'

deviceLog.init(AsyncStorage, {
  logToConsole: true,
  logRNErrors: true,
  maxNumberToRender: 0,
  maxNumberToPersist: 0
}).then(() => {
  deviceLog.success('logger initialized')
})

const onReceived = (notification) => {
  deviceLog.debug('Notification received:', notification)
}

const onRegistered = (notifData) => {
  deviceLog.debug('Device has been registered for push notifications!', notifData)
}

const onIds = (device) => {
  deviceLog.debug('Device info: ', device)
}

const handleAppStateChange = (/* currentAppState */) => {
  // deviceLog.debug('currentAppState', currentAppState)
}


class App extends Component {
  constructor() {
    super()

    if (Platform.OS === 'android') {
      // eslint-disable-next-line no-unused-expressions
      UIManager.setLayoutAnimationEnabledExperimental
      && UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  state = {
    checkingLoggin: true,
    loggedOut: true,
    email: '',
    openedFromNotification: false,
    showLog: false
  }

  componentWillMount() {
    deviceLog.debug('componentWillMount')
    OneSignal.addEventListener('received', onReceived)
    OneSignal.addEventListener('opened', this.onOpened)
    OneSignal.addEventListener('registered', onRegistered)
    OneSignal.addEventListener('ids', onIds)
  }

  componentDidMount() {
    deviceLog.debug('componentDidMount')
    AppState.addEventListener('change', handleAppStateChange)

    getCache('currentUser').then((value) => {
      if (value && value.token) {
        this.setState({ checkingLoggin: false, loggedOut: false, email: value.email })
        OneSignal.syncHashedEmail(value.email)
      } else {
        const email = value ? value.email : ''
        this.setState({ checkingLoggin: false, loggedOut: true, email })
      }
    })
  }

  componentWillUnmount() {
    deviceLog.debug('componentWillUnmount')
    OneSignal.removeEventListener('received', onReceived)
    OneSignal.removeEventListener('opened', this.onOpened)
    OneSignal.removeEventListener('registered', onRegistered)
    OneSignal.removeEventListener('ids', onIds)
  }

  onOpened = (openResult) => {
    deviceLog.debug('Message: ', openResult.notification.payload.body)
    deviceLog.debug('Data: ', openResult.notification.payload.additionalData)
    deviceLog.debug('isActive: ', openResult.notification.isAppInFocus)
    // deviceLog.debug('openResult: ', openResult)
    const data = openResult.notification.payload.additionalData
    this.setState({ openedFromNotification: true, route: data.route, eventId: data.eventId })
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

    if (this.state.openedFromNotification) {
      return <Redirect to={`/${this.state.route}`} />
    }

    return (
      <View style={styles.container}>
        { this.state.showLog ? <LogView inverted={false} timeStampFormat="HH:mm:ss" multiExpanded /> : null }
        <Route path="/" component={Home} />
        <Route exact path="/profile" render={() => <Profile onLogout={this.logout} />} />
      </View>
    )
  }
}


export default App
