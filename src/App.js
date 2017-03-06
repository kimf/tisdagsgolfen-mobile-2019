import React, { Component, PropTypes } from 'react'
import { AppState, AsyncStorage, View, Platform, UIManager } from 'react-native'
import { withRouter, Redirect } from 'react-router-native'
import OneSignal from 'react-native-onesignal'
import deviceLog from 'react-native-device-log'
import slowlog from 'react-native-slowlog'

import styles from './styles'
import { getCache, setCache } from './utils'
import Login from './containers/Login'
import Home from './containers/Home'

// if (__DEV__) {
//   // eslint-disable-next-line
//   const { whyDidYouUpdate } = require('why-did-you-update')
//   whyDidYouUpdate(React, { exclude: /^Connect/ })
// }

deviceLog.init(AsyncStorage, {
  logToConsole: false,
  logRNErrors: true,
  maxNumberToRender: 0,
  maxNumberToPersist: 100
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
  static propTypes = {
    index: PropTypes.number.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }).isRequired
  }

  constructor() {
    super()
    slowlog(this, /.*/)

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
        OneSignal.syncHashedEmail(value.email)
        this.setState({ checkingLoggin: false, loggedOut: false, email: value.email })
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

  logout = (email) => {
    setCache('currentUser', { email }).then(() => {
      this.setState({ loggedOut: true })
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
      return <Redirect to={`${this.state.route}`} />
    }

    if (this.props.index === 0 && this.props.location.pathname === '/') {
      return <Redirect replace to="/leaderboard" />
    }


    return (
      <View style={styles.container}>
        <Home onLogout={this.logout} toggleLog={this.toggleLog} />
      </View>
    )
  }
}

export default withRouter(App)
